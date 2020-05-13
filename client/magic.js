//'use strict';
console.log('i see this');
$('#btnSubmit').click(function (e) {
    e.preventDefault();
    var title = $('#titleInput').val();
    var body = $('#bodyInput').val();


    var dataObject = {
        title: title,
        body: body

    }
    //console.log(dataObject);

    $.ajax({
        url: '/subscribe', // form action url
        type: 'POST', // form submit method get/post
        dataType: 'json', // request type html/json/xml
        data: dataObject, // serialize form data


        success: function (response) {

            console.log(response)

        },
        error: function () {
            console.log('did not get to ajax');

        }
    });

})


//console.log(dataObject);