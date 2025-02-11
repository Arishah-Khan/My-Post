var titlePost = document.getElementById("titlePost");
var postDescription = document.getElementById("postDescription");
var posts = document.getElementById("posts");
var selectedImageSrc = ""; // Store the selected image source

function setBackgroundImage(src) {
    selectedImageSrc = src; 
    
    document.getElementById("imagePreview").innerHTML = `<img src="${src}" alt="Selected Background" style="width: 60px; height: 50px; border: 1px solid #ccc;">`;
}

function addPost() {
    if (titlePost.value && postDescription.value) {
        posts.innerHTML += `
            <div class="card mb-3 animate__animated animate__fadeIn" style="background-image: url(${selectedImageSrc}); background-size: cover; background-repeat: no-repeat; background-position: center;">
                <div class="card-header colours">
                    @Posts
                </div>
                <div class="card-body">
                    <h4 class="card-title colours text">${titlePost.value}</h4>
                    <p class="card-text colours text">${postDescription.value}</p> 
                </div>
                <div class="button p-4"> 
                    <button type="button" class="btn btn-edit animate__animated animate__pulse" onclick="editPost(event)">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="removePost(event)">Delete</button>
                </div>
            </div>`;
            
        titlePost.value = "";
        postDescription.value = "";
        selectedImageSrc = ""; 
        document.getElementById("imagePreview").innerHTML = ""; 
    } else {
        Swal.fire('Error', 'Please enter both title and description!', 'error');
    }
}

function removePost(event){
    var postToRemove = event.target.parentNode.parentNode;
    postToRemove.classList.add('animate__animated', 'animate__lightSpeedOutRight');
    setTimeout(() => {
        postToRemove.remove();
    }, 1000); 
}

function editPost(event){
    var postEdit = event.target.parentNode.parentNode;
    var currentPostTitle = postEdit.children[1].children[0].innerText;
    var currentPostDescription = postEdit.children[1].children[1].innerText;

    Swal.fire({
        title: 'Edit Post',
        html: `
            <input type="text" id="editTitle" class="form-control" value="${currentPostTitle}">
            <textarea id="editDescription" class="form-control mt-3">${currentPostDescription}</textarea>
        `,
        confirmButtonText: 'Update',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            postEdit.children[1].children[0].innerText = document.getElementById("editTitle").value;
            postEdit.children[1].children[1].innerText = document.getElementById("editDescription").value;
        }
    });
}
