const https_url = "https://mm4096.github.io/VH0524/"

let parts
let images
let config
let default_eye_and_mouth_configuration = {
    "eyes": {
        "scale": 1,
        "top": 0,
        "left": 0
    },
    "mouth": {
        "scale": 1,
        "top": 0,
        "left": 0
    }
}

$(document).ready(function() {
    update_loading_screen("Hanging out with friends...", 0)
    fetch(get_path_of_file("config/images.json"))
        .then(response => response.json())
        .then(data => {
            images = data
            update_images()
        })
        .catch(error => {
            $("#loading-header").text("Oh no!")
            update_loading_screen("An error occurred!", 100, "red")
            console.error(error)
        })
    update_loading_screen("Doing some homework...", 10)
    fetch(get_path_of_file("config/config.json"))
        .then(response => response.json())
        .then(data => {
            config = data
            update_config()
        })
        .catch(error => {
            $("#loading-header").text("Oh no!")
            update_loading_screen("An error occurred!", 100, "red")
            console.error(error)
        })
    update_loading_screen("Getting ready for the party...", 40)
    fetch(get_path_of_file("config/parts.json"))
        .then(response => response.json())
        .then(data => {
            parts = data
            update_parts()
        })
        .catch(error => {
            $("#loading-header").text("Oh no!")
            update_loading_screen("An error occurred!", 100, "red")
            console.error(error)
        })
})

function get_path_of_file(path) {
    switch(window.location.protocol) {
        case 'http:':
        case 'https:':
            return https_url + path
        case 'file:':
        case 'localhost':
            return "../" + path
        default:
            return "../" + path
    }
}

let images_ready = false
function update_images() {
    images_ready = true
}

let config_ready = false
function update_config() {
    config_ready = true
}

function update_parts() {
    if (!images_ready || !config_ready) {
        setTimeout(update_parts, 100)
        return
    }

    update_loading_screen("Doing very important stuff...", 75)
    // loop over all parts in images (body, mouth, eyes)
    for (let b in images.bodies) {
        let this_object = images.bodies[b]
        let path = this_object.path
        let name = this_object.name
        create_option("body", name, path)
    }
    for (let m in images.mouths) {
        let this_object = images.mouths[m]
        let path = this_object.path
        let name = this_object.name
        create_option("mouth", name, path)
    }
    for (let e in images.eyes) {
        let this_object = images.eyes[e]
        let path = this_object.path
        let name = this_object.name
        create_option("eyes", name, path)
    }
    update_item_with_values("body", config.initial_parts.body)
    update_item_with_values("mouth", config.initial_parts.mouth)
    update_item_with_values("eyes", config.initial_parts.eyes)
    setTimeout(late_update, 500)
    setTimeout(close_opacity, 500)
    update_loading_screen("Done!", 100)
}

function close_opacity() {
    setTimeout(() => {
        $(".overlay").css("opacity", 0)
        setTimeout(() => {
            $(".overlay").hide()
        }, 1000)
    }, 500)
}

function show_opacity() {
    $(".overlay").show()
    setTimeout(() => {
        $(".overlay").css("opacity", 1)
    }, 10)

}

function update_loading_screen(text, bar_percentage, bar_color = "default") {
    $("#loading-text").text(text)
    if (bar_percentage !== undefined) {
        $("#progress").css("width", `${bar_percentage}%`)
    }
    if (bar_color !== "default") {
        $("#progress").css("background-color", bar_color)
    }
}

function late_update() {
    update_mouth_css()
    update_eye_css()
    $("#body-image").show()
}

function create_option(part_type, name, image_path) {
    let tag = `
            <div class="grid-item">
                <button onclick="update_item(this)" data-part-type="${part_type}" data-name="${name}" class="option-button">
                    <img src="${get_path_of_file("images/" + image_path)}" alt="${name}" class="option-image" draggable="false">
                </button>
            </div>
        `
    $("#container").append(tag)
    return tag
}

function update_item(sender) {
    let sender_obj = $(sender)
    let part_type = sender_obj.data("part-type")
    let name = sender_obj.data("name")
    update_item_with_values(part_type, name)
}

function update_item_with_values(part_type, name) {
    let body = $("#body-image")
    let image_path = ""
    for (let i in images) {
        let this_object = images[i]
        for (let j in this_object) {
            let this_item = this_object[j]
            if (this_item.name === name) {
                image_path = this_item.path
                break
            }
        }
    }
    if (image_path === "") {
        console.error("Could not find image path for " + name)
        return
    }
    try {
        image_path = get_path_of_file("images/" + image_path)
    }
    catch (error) {
    }

    switch (part_type) {
        case "body":
            body.css("background-image", `url(${image_path})`)
            let config = ""
            for (let i in parts.bodies) {
                let this_body = parts.bodies[i]
                if (this_body.body_name === name) {
                    config = this_body
                    break
                }
            }
            if (config === "") {
                console.warn("Could not find config for " + name)
                return
            }

            set_natural_size(body)
            body.css("scale", config.body_size.x)
            body.css("top", "25%")
            for (let obj in config.objects) {
                let this_object = config.objects[obj]
                let name = this_object.name
                if (name === "eye-default") {
                    default_eye_and_mouth_configuration.eyes.scale = parseFloat(this_object.size)
                    default_eye_and_mouth_configuration.eyes.top = parseFloat(this_object.position.y)
                    default_eye_and_mouth_configuration.eyes.left = parseFloat(this_object.position.x)
                }
                else if (name === "mouth-default") {
                    default_eye_and_mouth_configuration.mouth.scale = parseFloat(this_object.size)
                    default_eye_and_mouth_configuration.mouth.top = parseFloat(this_object.position.y)
                    default_eye_and_mouth_configuration.mouth.left = parseFloat(this_object.position.x)
                }
            }
            setTimeout(late_update, 10)

            break
        case "mouth":
            $("#mouth-image").css({
                "background-image": `url(${image_path})`,
            })
            update_mouth_css()
            break
        case "eyes":
            $("#eye-image").css({
                "background-image": `url(${image_path})`,
            })
            update_eye_css()
            break
    }
}

function update_mouth_css() {
    let self_width = $("#mouth-image").width()
    let left = ($("#body-image").width() * 0.5) - (self_width * 0.5)
    $("#mouth-image").css({
        "top": `${default_eye_and_mouth_configuration.mouth.top}px`,
        "left": `${left}px`,
        "transform": `scale(${default_eye_and_mouth_configuration.mouth.scale})`
    })
}

function update_eye_css() {
    let self_width = $("#eye-image").width()
    let left = ($("#body-image").width() * 0.5) - (self_width * 0.5)
    $("#eye-image").css({
        "top": `${default_eye_and_mouth_configuration.eyes.top}px`,
        "left": `${left}px`,
        "transform": `scale(${default_eye_and_mouth_configuration.eyes.scale})`
    })
}

function set_natural_size(sender) {
    let img = new Image();
    img.src = $(sender).css("background-image").slice(5, -2); // Extract url from the css property

    img.onload = function() {
        let imgWidth = this.naturalWidth;
        let imgHeight = this.naturalHeight;

        $(sender).css({
            "width": imgWidth,
            "height": imgHeight
        });
    };
}