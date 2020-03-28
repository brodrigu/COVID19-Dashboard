const conf = {
    modelDefaults: {
        daysToCalculate: 1000,
        daysUntilIcuEntry: 14,
        daysUntilIcuExit: 21,
        daysUntilMorbidity: 16,
        daysUntilRecovery: 28,
        daysUntilSymptoms: 5,
        icuRequirementRate: 0.05,
        initialInfectionCount: 50,
        morbidityRate: 0.03,
        population: 327000000,
        totalIcuBeds: 84000,
        virusDoublingDays: 5,
    },
};

export default conf;
