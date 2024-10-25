let form = document.getElementById("myform");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let basicSalary = Number(document.getElementById("salary").value);
    let benefits = Number(document.getElementById("benefits").value);
    let grossSalary = calculateGrossSalary(basicSalary, benefits);

    // Calculate deductions
    let nssf = calculateNSSF(grossSalary);
    let nhif = calculateNHIF(grossSalary);
    let nhdf = calculateNHDF(grossSalary);
    let taxableIncome = calculateTaxableIncome(grossSalary, nhif, nhdf, nssf);
    let payee = calculatePayee(taxableIncome);
    let netPay = calculateNetSalary(grossSalary, nhif, nhdf, nssf, payee);
    //console.log(grossSalary);

    document.getElementById("gross").innerHTML = grossSalary;
    document.getElementById("nhif").innerHTML = nhif;
    document.getElementById("nssf").innerHTML = nssf;
    document.getElementById("nhdf").innerHTML = nhdf;
    document.getElementById("taxable").innerHTML = taxableIncome;
    document.getElementById("final_payee").innerHTML = payee;
    document.getElementById("net_pay").innerHTML = netPay;



    // The  functions to calculate the deductions and payee are defined below

    function calculateGrossSalary(basicSalary, benefits) {
        return basicSalary + benefits;
    }
    function calculateNHIF(sal_range) {
        let deductions = 0
        if (sal_range >= 0 && sal_range <= 5_999) {
            deductions = 150;
        }
        else if (sal_range >= 6_000 && sal_range <= 7_999) {
            deductions = 300;
        }
        else if (sal_range >= 8_000 && sal_range <= 11_999) {
            deductions = 400;
        } else if (sal_range >= 12_000 && sal_range <= 14_999) {
            deductions = 500;
        } else if (sal_range >= 15_000 && sal_range <= 19_999) {
            deductions = 600;
        } else if (sal_range >= 20_000 && sal_range <= 24_999) {
            deductions = 750;
        } else if (sal_range >= 25_000 && sal_range <= 29_999) {
            deductions = 850;
        } else if (sal_range >= 30_000 && sal_range <= 34_999) {
            deductions = 900;
        } else if (sal_range >= 35_000 && sal_range <= 39_999) {
            deductions = 950;
        } else if (sal_range >= 40_000 && sal_range <= 44_999) {
            deductions = 1000;
        } else if (sal_range >= 45_000 && sal_range <= 49_999) {
            deductions = 1100
        } else if (sal_range >= 50_000 && sal_range <= 59_999) {
            deductions = 1200
        } else if (sal_range >= 60_000 && sal_range <= 69_999) {
            deductions = 1300;
        } else if (sal_range >= 70_000 && sal_range <= 79_999) {
            deductions = 1400;
        } else if (sal_range >= 80_000 && sal_range <= 89_999) {
            deductions = 1500;
        } else if (sal_range >= 90_000 && sal_range <= 99_999) {
            deductions = 1600;
        } else {
            deductions = 1700;
        }
        return deductions;
    }

    function calculateNSSF(nssf1) {
        let nssf2 = 0;
        if (nssf1 >= 0 && nssf1 <= 18000) {
            nssf2 = 0.06 * nssf1;
        }
        else {
            nssf2 = 0.06 * 18000;
        }
        return nssf2;

    }

    function calculateNHDF(salary) {
        return salary * 0.015;
    }

    function calculateTaxableIncome(grossSalary, nhif, nhdf, nssf) {
        return grossSalary - (nhif + nhdf + nssf);
    }

    function calculatePayee(tax_in, relief = 2400) {
        let tax_income1 = 0;
        if (tax_in >= 0 && tax_in <= 24000) {
            tax_income1 = 0
        } else if (tax_in > 24_000 && tax_in <= 32333) {
            tax_income1 = ((24_000 * 0.1) + ((tax_in - 24_000) * 0.25)) - relief;
        } else if (tax_in > 32333 && tax_in <= 500_000) {
            tax_income1 = ((24_000 * 0.1) + (8333 * 0.25) + ((tax_in - 32333) * 0.30)) - relief;
        } else if (tax_in > 500_000 && tax_in <= 800_000) {
            tax_income1 = ((24_000 * 0.1) + (8333 * 0.25) + (467_667 * 0.30) + ((tax_in - 500_000) * 0.325)) - relief;
        } else {
            tax_income1 = ((24_000 * 0.1) + (8333 * 0.25) + (467_667 * 0.30) + (300_000 * 0.325) + ((tax_in - 800_000) * 0.35)) - relief;
        }
        return tax_income1;
    }

    function calculateNetSalary(grossSalary, nhif, nhdf, nssf, payee) {
        return grossSalary - (nhif + nhdf + nssf + payee);
    }



    form.reset();
})