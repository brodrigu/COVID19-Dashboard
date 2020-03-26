import moment from 'moment';

const calculatePercentImmuneOrInfected = ({
    currentlyInfected,
    totalImmune,
    newlyImmune,
    notImmune,
    newlyInfected,
}) => (currentlyInfected + totalImmune - newlyImmune)
    / (currentlyInfected + totalImmune + notImmune - newlyImmune - newlyInfected);

const calculatePercentAfflicted = ({
    currentlyInfected,
    notImmune,
}) => currentlyInfected / (notImmune + currentlyInfected);

const calculateNotImmune = (population, cumulativeDeaths, percentImmuneOrInfected) => Math.round((population - cumulativeDeaths) * (1 - percentImmuneOrInfected));

const calculateNewlyInfected = (currentlyInfected, infectionsPassedPerPersonDay, percentImmuneOrInfected) => Math.round(currentlyInfected * infectionsPassedPerPersonDay * (1 - percentImmuneOrInfected));

const calculateInfectionsPassedPerPersonDay = virusDoublingDays => Math.pow(2, (1 / virusDoublingDays)) - 1;

const calculateCurrentlyInfected = (newlyInfected, currentlyInfected, newIcuDeaths, newIcuRejects, newlyImmune) => Math.round(newlyInfected + currentlyInfected - newIcuDeaths - newIcuRejects - newlyImmune);

const calculateTotalSymptomatic = (newlySymptomatic, totalSymptomatic, newIcuRejects, newIcuDeaths, newlyImmune) => Math.round(newlySymptomatic + totalSymptomatic - newIcuRejects - newIcuDeaths - newlyImmune);

const calculateNewlyDischarged = (newIcuCases, newIcuDeaths) => newIcuCases - newIcuDeaths;

const calculateAvailableIcuBeds = (currentIcuBeds, currentIcuCases, newIcuDeaths, newlyDischarged) => Math.round(currentIcuBeds - currentIcuCases + newIcuDeaths + newlyDischarged);

const calculateNewIcuCases = (newlyInfected, icuRequirementRate) => Math.round(newlyInfected * icuRequirementRate);

const calculateIcuBedProbability = (newIcuCases, availableIcuBeds) => (newIcuCases < availableIcuBeds ? 1 : availableIcuBeds / newIcuCases);

export const calculateData = ({
    population = 327000000,
    initialInfectionCount = 50,
    daysUntilSymptoms = 5,
    daysUntilMorbidity = 16,
    morbidityRate = 0.03,
    icuRequirementRate = 0.05,
    daysUntilIcuEntry = 14,
    daysUntilIcuExit = 21,
    totalIcuBeds = 84000,
    daysUntilRecovery = 28,
    daysToCalculate = 20,
}) => {
    const virusDoublingDays = 5;
    const daysInIcu = daysUntilIcuExit - daysUntilIcuEntry;
    const daysInIcuUntilDeath = daysUntilMorbidity - daysUntilIcuEntry;
    const day0 = {
        date: '2020-02-01',
        day: 0,
        percentImmuneOrInfected: 0,
        percentAfflicted: 0,
        notImmune: population,
        newlyInfected: initialInfectionCount,
        currentlyInfected: initialInfectionCount,
        newlySymptomatic: 0,
        totalSymptomatic: 0,
        newlyDischarged: 0,
        currentIcuBeds: totalIcuBeds,
        availableIcuBeds: totalIcuBeds,
        newIcuCases: 0,
        icuBedProbability: 1,
        icuAdmitted: 0,
        currentIcuCases: 0,
        newIcuRejects: 0,
        newIcuDeaths: 0,
        cumulativeDeaths: 0,
        newlyImmune: 0,
        totalImmune: 0,
        virusDoublingDays: 5, // @todo make this an input
        infectionsPassedPerPersonDay: calculateInfectionsPassedPerPersonDay(5),
    };

    const data = [day0];
    let thisDay = day0;
    for (let i = 1; i < daysToCalculate; i++) {
        const lastDay = thisDay;

        const percentImmuneOrInfected = calculatePercentImmuneOrInfected(lastDay);
        const infectionsPassedPerPersonDay = calculateInfectionsPassedPerPersonDay(5);
        const newlyInfected = calculateNewlyInfected(lastDay.currentlyInfected, infectionsPassedPerPersonDay, percentImmuneOrInfected);
        const newlySymptomatic = i > daysUntilSymptoms ? data[i - daysUntilSymptoms].newlyInfected : 0;
        const dayCasesEnteredIcu = (i - daysInIcu > 0) ? data[i - daysInIcu] : { newIcuCases: 0, newIcuRejects: 0 };
        const dayIcuDeathsEnteredICU = (i - daysInIcuUntilDeath > 0) ? data[i - daysInIcuUntilDeath] : { newIcuDeaths: 0, icuAdmitted: 0 };
        const newlyDischarged = calculateNewlyDischarged(dayCasesEnteredIcu.newIcuCases, dayIcuDeathsEnteredICU.newIcuDeaths);
        const currentIcuBeds = totalIcuBeds; // @TODO make this a variable that can change over time
        const dayNewIcuCasesGotInfected = (i - daysUntilIcuEntry > 0) ? data[i - daysUntilIcuEntry] : { newlyInfected: 0 };
        const availableIcuBeds = calculateAvailableIcuBeds(currentIcuBeds, lastDay.currentIcuCases, lastDay.newIcuDeaths, lastDay.newlyDischarged);
        const newIcuCases = calculateNewIcuCases(dayNewIcuCasesGotInfected.newlyInfected, icuRequirementRate);
        const icuBedProbability = calculateIcuBedProbability(newIcuCases, availableIcuBeds);
        const icuAdmitted = newIcuCases * icuBedProbability;
        const currentIcuCases = lastDay.currentIcuCases + icuAdmitted - newlyDischarged - lastDay.newIcuDeaths;
        const newIcuRejects = Math.round(newIcuCases * (1 - icuBedProbability));
        const newIcuDeaths = Math.round(dayIcuDeathsEnteredICU.icuAdmitted * (morbidityRate / icuRequirementRate));
        const cumulativeDeaths = newIcuRejects + newIcuDeaths + lastDay.cumulativeDeaths;
        const newlyImmune = dayNewIcuCasesGotInfected.newlyInfected - dayCasesEnteredIcu.newIcuRejects - dayIcuDeathsEnteredICU.newIcuDeaths;
        const totalImmune = newlyImmune + lastDay.totalImmune;

        thisDay = {
            date: moment(lastDay.date).add(1, 'day').format('YYYY-MM-DD'),
            day: i,
            percentImmuneOrInfected,
            percentAfflicted: calculatePercentAfflicted(lastDay),
            notImmune: calculateNotImmune(population, lastDay.cumulativeDeaths, percentImmuneOrInfected),
            newlyInfected,
            currentlyInfected: calculateCurrentlyInfected(newlyInfected, lastDay.currentlyInfected, lastDay.newIcuDeaths, lastDay.newIcuRejects, lastDay.newlyImmune),
            newlySymptomatic,
            totalSymptomatic: calculateTotalSymptomatic(newlySymptomatic, lastDay.totalSymptomatic, lastDay.newIcuRejects, lastDay.newIcuDeaths, lastDay.newlyImmune),
            newlyDischarged,
            currentIcuBeds,
            availableIcuBeds,
            newIcuCases,
            icuBedProbability,
            icuAdmitted,
            currentIcuCases,
            newIcuRejects,
            newIcuDeaths,
            cumulativeDeaths,
            newlyImmune,
            totalImmune,
            virusDoublingDays,
            infectionsPassedPerPersonDay: virusDoublingDays,
        };
        data.push(thisDay);
    }
    return data;
};
