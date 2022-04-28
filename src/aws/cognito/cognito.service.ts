import { Injectable, Logger } from '@nestjs/common';
import { CognitoClientProvider } from './cognito-client.provider';
import { CreateCognitoUserInput } from './dtos/create-cognito-user.input';
import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminGetUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  AuthenticationResultType,
  AuthFlowType,
  DeliveryMediumType,
  InitiateAuthCommand,
  MessageActionType,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoService {
  private readonly logger = new Logger(CognitoService.name);
  private readonly userPoolId: string;
  private readonly clientId: string;

  constructor(
    private readonly config: ConfigService,
    private readonly cognitoClientProvider: CognitoClientProvider,
  ) {
    this.userPoolId = config.get('aws.cognito.userPoolId');
    this.clientId = config.get('aws.cognito.clientId');
    this.logger.debug('CognitoService initialized');
  }

  public async userExists(username: string): Promise<boolean | never> {
    try {
      await this.cognitoClientProvider.client.send(
        new AdminGetUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
        }),
      );
    } catch (error) {
      if (error.name === 'UserNotFoundException') {
        return false;
      }
      throw error;
    }
    return true;
  }

  /**
   * Create user in Cognito Pool
   * @param input
   */
  public async createUser(
    input: CreateCognitoUserInput,
  ): Promise<boolean | never> {
    const { username, password, options } = input;

    const recreateIfExists =
      options && 'recreateIfExists' in options
        ? options.recreateIfExists
        : false;

    recreateIfExists &&
      (await this.userExists(username)) &&
      (await this.deleteUser(username));

    const command: AdminCreateUserCommandInput = {
      UserPoolId: this.userPoolId,
      ForceAliasCreation: false,
      DesiredDeliveryMediums: [DeliveryMediumType.EMAIL],
      Username: username,
      MessageAction: MessageActionType.SUPPRESS,
    };

    await this.cognitoClientProvider.client.send(
      new AdminCreateUserCommand(command),
    );

    if (password) {
      await this.setUserPassword(username, password);
    }

    return true;
  }

  public async auth(
    username: string,
    password: string,
  ): Promise<AuthenticationResultType | never> {
    const command = new AdminInitiateAuthCommand({
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });
    const { AuthenticationResult } =
      await this.cognitoClientProvider.client.send(command);
    return AuthenticationResult;
  }

  /**
   * Refresh token
   * @param refreshToken
   */
  public async refreshToken(
    refreshToken: string,
  ): Promise<AuthenticationResultType | never> {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });
    const { AuthenticationResult } =
      await this.cognitoClientProvider.client.send(command);
    return AuthenticationResult;
  }

  /**
   * Set user password
   * @param username
   * @param password
   * @param permanent
   */
  public async setUserPassword(
    username: string,
    password: string,
    permanent = true,
  ): Promise<void | never> {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      Password: password,
      Permanent: permanent,
    });
    await this.cognitoClientProvider.client.send(command);
  }

  /**
   * Disable user
   * @param username
   */
  public async disableUser(username: string): Promise<void | never> {
    const command = new AdminDisableUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
    });
    await this.cognitoClientProvider.client.send(command);
  }

  /**
   * Delete user from pool
   * @param username
   */
  public async deleteUser(username: string): Promise<void | never> {
    const command = new AdminDeleteUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
    });
    await this.cognitoClientProvider.client.send(command);
  }
}
