import activeExperiments from 'active';

const account = (Current || {}).Account;
const plan = (Current || {}).Plan;
const user = (Current || {}).User;
const uri = window.location.pathname;

(function(activeExperiments, account, plan, user, uri) {
    if (typeof account == 'undefined') {
        return;
    }
    activeExperiments.forEach((activeExperiment) => {

        let experiment = new activeExperiment;
        experiment.setAccount(account);
        experiment.setPlan(plan);
        experiment.setUser(user);

        if (!experiment.uriMatch(uri)) {
            return;
        }

        // audience check
        if (!experiment.audienceMatch()) {
            return;
        }

        // all experiment classes implement a 'run' method
        if (typeof experiment.run != 'undefined') {
            experiment.run(account);
        }
    });
})(activeExperiments, account, plan, user, uri);
