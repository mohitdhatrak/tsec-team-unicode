import Axios from "axios";

export const algorithmForCost = async (
    nameOfProduct,
    ageOfProduct,
    conditionOfProduct
) => {
    const params = {
        api_key: "2595D4081F1B4E39AAD408E6AAF2CCE5",
        type: "search",
        search_term: nameOfProduct,
        amazon_domain: "amazon.com",
    };

    let rawCost;
    await Axios.get("https://api.asindataapi.com/request", { params })
        .then((response) => {
            rawCost = response.data.search_results[0].price.value;
            console.log(rawCost);
        })
        .catch((error) => {
            console.log(error);
        });

    let x = 82.06 * rawCost; // USD to INR

    if (ageOfProduct === "1") {
        x = x - 0.01 * x;
    }
    if (ageOfProduct === "2") {
        x = x - 0.02 * x;
    }
    if (ageOfProduct === "3") {
        x = x - 0.03 * x;
    }
    if (ageOfProduct === "4") {
        x = x - 0.04 * x;
    }
    if (ageOfProduct === "5") {
        x = x - 0.05 * x;
    }
    if (ageOfProduct === "6") {
        x = x - 0.06 * x;
    }
    if (ageOfProduct === "7") {
        x = x - 0.07 * x;
    }
    if (ageOfProduct === "8") {
        x = x - 0.1 * x;
    }
    if (ageOfProduct === "9") {
        x = x - 0.12 * x;
    }
    if (ageOfProduct === "10") {
        x = x - 0.14 * x;
    }

    // Flawless
    if (conditionOfProduct === "1") {
        x = x - 0.02 * x;
    }

    // Good
    if (conditionOfProduct === "2") {
        x = x - 0.1 * x;
    }

    // Mediocre
    if (conditionOfProduct === "3") {
        x = x - 0.3 * x;
    }

    // Below
    if (conditionOfProduct === "4") {
        x = x - 0.5 * x;
    }

    console.log(x);

    return x;
};
