const launchYear = 2018;
const launchCompany = 'NASA';
const launchCompanyCRS = 'NASA (CRS)';

// Filter the results based upon the company incluedes NASA
const filterByCompany = (data) => {
    const payloads = data.rocket.second_stage.payloads;
    return payloads.some((ele) =>
        ele.customers.includes(launchCompany) ||
        ele.customers.includes(launchCompanyCRS)
    );
};

// Filter the results based upon the year of launch
const filterByYear = (data) => {
    return data?.launch_year == launchYear;
};

// Filter the results and generate a new object type of SpaceType and sort it based upon the total payload count
const prepareData = (payload) => {
    if (!payload) {
        return;
    }
    let result = [];

    payload.forEach((data) => {
        if (filterByYear(data) && filterByCompany(data)) {
            const flight_number = data.flight_number;
            const mission_name = data.mission_name;
            const payloads_count = data.rocket.second_stage.payloads.length;

            const temp = {
                flight_number,
                mission_name,
                payloads_count,
            };
            result.push(temp);
        }
    });

    return result.sort((a, b) =>
        b.payloads_count - a.payloads_count ||
        b.flight_number - a.flight_number
    );
};

// Render the json in the Browser
const renderData = (data) => {
    document.getElementById('out').innerHTML = JSON.stringify(data, null, 2);
};

module.exports = {
	prepareData,
	renderData,
};
