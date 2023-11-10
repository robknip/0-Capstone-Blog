jQuery(function () {
    var eB = $('.edit-button').on('click', function () {
        console.log($(this).attr('id'))
    })
    var tB = $('.button-trash').on('click', function () {
        console.log($(this).val())
    })
})