changeImgBtn = document.getElementById("change-image-btn")
imgBox = document.getElementById("image")

var imgTheme = {
    nature: [
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    ],
    city: [
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1465447142348-e9952c393450?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNpdHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1465815367149-ca149851a3a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGNpdHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    space: [
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHNwYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHNwYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ]
}

imgArray = imgTheme.nature  // Change Theme Here
for (var i = 0; i < imgArray.length; i++) {
    console.log(imgArray[i])
}

imgBox.src = imgArray[imgArray.length - 1]

changeImgBtn.addEventListener("click", changeColors)
index = 0

function changeColors() {
    imgBox.src = imgArray[index]
    index += 1
    if (index === imgArray.length) {
        index = 0
    }
}


