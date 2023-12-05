let btn = document.getElementById('btn');
const resultdata = document.getElementById('resultdata')
document.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        document.getElementById("btn").click();
    }
});


const fetchData = () => {
    let inp = document.getElementById('inp').value;
    let apiUrl = `https://restcountries.com/v3.1/all`;

    if (inp.length > 0) {
        apiUrl = `https://restcountries.com/v3.1/currency/${inp}`;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data && Array.isArray(data) && data.length > 0) {
                let htmlContent = ''; // Store the HTML content
                data.forEach((ele, index) => {
                    let currenciesHTML = '';
                    if (ele.flags) {
                        if (ele.currencies && typeof ele.currencies === 'object') {
                            for (const currencyCode in ele.currencies) {
                                if (Object.hasOwnProperty.call(ele.currencies, currencyCode)) {
                                    const currency = ele.currencies[currencyCode];
                                    currenciesHTML += `
                                        <p><b>Currency Code:</b> ${currencyCode}</p>
                                        <p><b>Currency Name:</b> ${currency.name}</p>
                                        <p><b>Currency Symbol:</b> ${currency.symbol}</p>
                                    `;
                                }
                            }
                        }
                        // Concatenate the HTML content for each element
                        htmlContent += `
                        <div id="one-data">
                        <div id="img">
                            <img src="${ele?.flags.png}">
                            <h2>${ele?.altSpellings[1]}</h2>
                            <p><b>${ele?.translations.urd.official}</b></p>
                        </div>
                        <div class="more">
                            <div class="otherdata">
                                <table>
                                    <!-- Other rows of the table -->
                                    <tr>
                                        <th>Currencies</th>
                                        <td>${currenciesHTML}</td>
                                    </tr>
                                    <!-- Other rows of the table -->
                                </table>
                            </div>
                        </div>
                        </div>
                        `;
                    } else {
                        // Handle missing data or properties here
                        htmlContent += "Data missing or in unexpected format.";
                    }
                });
                // Set the final HTML content to resultdata.innerHTML
                resultdata.innerHTML = htmlContent;
            } else {
                // Handle empty or unexpected API response
                resultdata.innerHTML = "No data found for the entered currency.";
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            resultdata.innerHTML = "Failed to fetch data. Please try again later.";
        });
}
btn.addEventListener('click', fetchData);
window.addEventListener('load', fetchData);

