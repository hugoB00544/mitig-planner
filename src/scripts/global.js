import { initialiseDamageLine } from "../scripts/initialiseDamageLine.js";
import { initialise } from "../scripts/initialiseData.js";

const jobList = initialise();
const damageLineList = initialiseDamageLine();

const globalVal = {
    jobList,
    damageLineList
};

export default globalVal;
