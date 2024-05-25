let body_path = ""

$(document).ready(function () {
    $("#body-size-output").val(1)
    $("#body-size-input").val(1)

    $("#eye-size-output").val(1)
    $("#eye-size-input").val(1)

    $("#eye-pos-output").val(90)
    $("#eye-pos-input").val(90)

    $("#mouth-size-output").val(1)
    $("#mouth-size-input").val(1)

    $("#mouth-pos-output").val(150)
    $("#mouth-pos-input").val(150)

    update_output()
})

// region body_calibration
function update_body_image(file_input, selector) {
    let result = set_background_image(file_input, selector)
    if (result.length > 0) {
        let img = new Image()
        img.src = URL.createObjectURL(result[0])
        body_path = result[0].name.split(".")[0]
        img.onload = function () {
            $("#body-image").width(img.width).height(img.height)
            update_body_size()
        }
    }
}

function update_body_size() {
    let scale = $("#body-size-input").val()
    $("#body-size-output").val(scale)
    $("#body-image").css("transform", `scale(${scale})`)
}

function set_body_size_value() {
    let size = $("#body-size-output").val()
    $("#body-size-input").val(size)
    update_body_size()
}

function set_eye_size_value() {
    let size = $("#eye-size-output").val()
    $("#eye-size-input").val(size)
    update_eye_size()
}

function update_eye_size() {
    let size = $("#eye-size-input").val()
    $("#eye-size-output").val(size)
    $("#eye-image").css("scale", `${size * 100}%`)
}

function set_eye_pos_value() {
    let size = $("#eye-pos-output").val()
    $("#eye-pos-input").val(size)
    update_eye_pos()
}

function update_eye_pos() {
    let size = $("#eye-pos-input").val()
    $("#eye-pos-output").val(size)
    $("#eye-image").css("top", `${size}px`)
}

function set_mouth_size_value() {
    let size = $("#mouth-size-output").val()
    $("#mouth-size-input").val(size)
    update_mouth_size()
}

function update_mouth_size() {
    let size = $("#mouth-size-input").val()
    $("#mouth-size-output").val(size)
    $("#mouth-image").css("scale", `${size * 100}%`)
}

function set_mouth_pos_value() {
    let size = $("#mouth-pos-output").val()
    $("#mouth-pos-input").val(size)
    update_mouth_pos()
}

function update_mouth_pos() {
    let size = $("#mouth-pos-input").val()
    $("#mouth-pos-output").val(size)
    $("#mouth-image").css("top", `${size}px`)
}
//endregion

function update_output() {
    let textarea = $("#output")
    let data = ""
    let object = new BodyCalibration()
    object.body_name = body_path.split(".")[0]
    object.body_size = new Vector2($("#body-size-output").val(), $("#body-size-output").val())

    let eye = new GameObject()
    eye.name = "eye-default"
    eye.position = new Vector2($("#eye-image").width(), $("#eye-pos-output").val())
    eye.size = $("#eye-size-output").val()
    object.objects = [eye]

    let mouth = new GameObject()
    mouth.name = "mouth-default"
    mouth.position = new Vector2($("#mouth-image").width(), $("#mouth-pos-output").val())
    mouth.size = $("#mouth-size-output").val()
    object.objects.push(mouth)

    data = JSON.stringify(object)
    textarea.val(data)
    setTimeout(update_output, 100)
}