import Experiment from 'hijinks/Experiment';
import SurveyVariation from 'experiment/SurveyV3/SurveyVariation';
import ControlVariation from 'experiment/SurveyV3/ControlVariation';

export default class SurveyV3Experiment extends Experiment {

    title() {
        return 'survey_v3';
    }

    uriMatch(uri) {
        return uri.includes('/scheduler/setup')
    }

    variations() {
        return [
            {
                spec: SurveyVariation,
                dist: 50
            },
            {
                name: ControlVariation,
                dist: 50
            },
        ];
    }

    run() {
        const variationClass = this.getVariation();
        const variation = new variationClass;
        variation.run();
    }

    getVariation() {
        // some logic to choose a variation based on account
        // possibly a server call here to something like
        // Rollout or ABLincoln
        // Ideally we could pass in:
        //  - account_id
        //  - experiment_title
        //  - variation_percentages
        
        return SurveyVariation;
    }
}
