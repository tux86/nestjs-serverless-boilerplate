module.exports = async ({ options, resolveVariable }) => {
  // We can resolve other variables via `resolveVariable`
  const stage = await resolveVariable('sls:stage');
  const region = await resolveVariable(
    'opt:region, self:provider.region, "eu-west-1"',
  );

  // Resolver may return any JSON value (null, boolean, string, number, array or plain object)
  return {
    includeFileExt: '.offline.yaml',
  };
};
