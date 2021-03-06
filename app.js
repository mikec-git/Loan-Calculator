// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Show loading
    document.getElementById('loading').style.display = 'block';
    // Remove loader
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults(){
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
    
    // UI Results
    if(isFinite(monthlyPayment)){
        UImonthlyPayment.value  = monthlyPayment.toFixed(2);
        UItotalPayment.value    = (monthlyPayment * months).toFixed(2);
        UItotalInterest.value   = ((monthlyPayment * months) - principal).toFixed(2);
        
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loading').style.display = 'none';
    } else{
        showError('Please check your numbers');
    }
}

// Show Error
function showError(error){
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Hide loading
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}