let file_path = ""

$(document).ready(function () {
    $("#eye-pos-output").val(0)
    $("#eye-pos-input").val(0)

    $("#eye-size-output").val(1)
    $("#eye-size-input").val(1)
    update_eye_pos()
    update_output()
})

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

function update_output() {
    let textarea = $("#output")
    let data = ""
    let object = new GameObject()
    object.name = file_path.split(".")[0]
    object.size = new Vector2($("#eye-size-output").val(), $("#eye-size-output").val())
    object.position = new Vector2($("#eye-image").width(), $("#eye-pos-output").val())

    data = JSON.stringify(object)
    textarea.val(data)
    setTimeout(update_output, 100)
}

function update_eye_image(self, selector) {
    let files = set_background_image(self, selector)
    if (files.length > 0) {
        file_path = files[0].name
    }
}