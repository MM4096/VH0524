// $(document).ready(function () {
//     update_monster();
//     update_sizes();
//     $("#body_size_x").val(400)
//     $("#body_size_y").val(400)
//     update_body_size();
//     update_data()
// })
//
//
// function update_monster() {
// }

function set_background_image(file_input, selector) {
    const files = file_input.files
    if (files.length > 0) {
        $(selector).css("background-image", `url(${URL.createObjectURL(files[0])})`)
    }
    return files
}

// function update_sizes() {
// }



// function update_eye_size() {
//     let size = $("#eye_size").val()
//     $("#eye-image").css("background-size", `${size}%`)
// }

// function eye_y_pos() {
//     let y = $("#eye_y").val()
//     $("#eye-image").css("top", y + "px")
// }
//
// function update_mouth_size() {
//     let size = $("#mouth_size").val()
//     $("#mouth-image").css("background-size", `${size}%`)
// }
//
// function mouth_y_pos() {
//     let y = $("#mouth_y").val()
//     $("#mouth-image").css("top", y + "px")
// }

// function update_data() {
//     let textarea = $("#output")
//     let data = ""
//     let object = new BodyCalibration()
//     object.body_size = new Vector2($("#body_size_x").val(), $("#body_size_y").val())
//
//     let mouth = new GameObject()
//     mouth.name = "mouth-default"
//     mouth.position = new Vector2($("#mouth-image").width(), $("#mouth_y").val())
//     object.objects = [mouth]
//
//     data = JSON.stringify(object)
//     textarea.val(data)
//     setTimeout(update_data, 100)
// }