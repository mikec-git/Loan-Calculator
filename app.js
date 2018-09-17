// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

function calculateResults(e){
    e.preventDefault();

    // UI Vars
    const UIamount      = document.querySelector('#amount');
    const UIinterest    = document.querySelector('#interest');
    const UIyears       = document.querySelector('#years');
    const UImonthlyPayment  = document.querySelector('#monthly-payment');
    const UItotalPayment    = document.querySelector('#total-payment');
    const UItotalInterest   = document.querySelector('#total-interest');

    // Loan calculations
    const principal             = parseFloat(UIamount.value);    
    const months                = parseFloat(UIyears.value)*12;
    const monthlyInterestRate   = parseFloat(UIinterest.value) / (100 * 12);
    const monthlyPayment        = (monthlyInterestRate * principal)/(1 - Math.pow(1 + monthlyInterestRate, -months));
    
    const totalPayment  = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    // UI results
    UImonthlyPayment.value  = monthlyPayment.toFixed(2);
    UItotalPayment.value    = totalPayment.toFixed(2);
    UItotalInterest.value   = totalInterest.toFixed(2);
}