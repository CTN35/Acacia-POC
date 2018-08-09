export const environment = {
  envName: 'prod',
  production: true,
  bpmBaseUrl: 'http://10.115.37.20:8080/kie-server/services/rest/server/',
  bpmContainer: 'bpmc_1.0.0',
  bpmProcessId: 'fr.edf.bpmc.AdaptationContratProcess',
  bpmContratProcessId: 'fr.edf.bpmc.TraitementContratProcess',
  allowMultipleProcess: false,
  tempsAttenteEmail: '1m',
  ihmClient: true,
  clientAnnuleNonEligible: false
};
