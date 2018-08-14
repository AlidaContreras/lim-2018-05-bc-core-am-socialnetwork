const db = firebase.firestore();
const speech = () => {// esta funcion es el codigo que sale en el error grandote
	firestore = firebase.firestore();
	const settings = { timestampsInSnapshots: true };
	firestore.settings(settings);
}
const savePost = () => {//esta funcion es la que guarda el ID, EMAIL Y STRING(post) en fireStore
	speech();
	db.collection("POST`s").add({
		id: idUserInLine,
		email: emailUserInLine,
		post: textarea2.value
	})
		.then((docRef) => {
			// console.log("Document written with ID: ", docRef.id);

		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
	event.preventDefault();
}

//leer documentos
const readPost = () => {
	speech();
	db.collection("POST`s").onSnapshot((querySnapshot) => {
		boxPosteado.innerHTML = "";
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data().post}`);
			boxPosteado.innerHTML +=
				`
			<br>
			<br><div class="z-depth-3 input-field col s10">
			<textarea disabled id="elPost-${doc.id}" cols="30" rows="10">${doc.data().post}</textarea>
      </div>
      <br>
			<button class="waves-effect btn red darken-2" onclick = "deletePost('${doc.id}')">Eliminar</button>
			<button class="btn orange" id="buttonAdd-${doc.id}"  onclick="editPost('${doc.id}', '${doc.data().post}')" >Editar</button>
			<button class="btn blue rigth" >Like</button>
			`
		});
	});
}
readPost();

const deletePost = (id) => {
	const result = confirm("¿Estas segurx que deseas eliminar el post?");
	if (result == true) {
		db.collection("POST`s").doc(id).delete().then(() => {
			console.log("Document successfully deleted!");
		}).catch((error) => {
			console.error("Error removing document: ", error);
		});
	}
}

const editPost = (id, post) => {
	const cuadroPost = document.getElementById(`elPost-${id}`);
	cuadroPost.disabled = false;
	document.getElementById(`elPost-${id}`).value = post;
	const button = document.getElementById(`buttonAdd-${id}`);
	button.innerHTML = 'Guardar';
	button.onclick = () => {
		const washingtonRef = db.collection("POST`s").doc(id);
		const post = document.getElementById(`elPost-${id}`).value;
		return washingtonRef.update({
			post
		})
			.then(() => {
				console.log("Document successfully updated!");
				button.innerHTML = 'Editar';
				button.onclick = editPost;
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
	}
}
const logout = () => {
	firebase.auth().signOut()
		.then(() => {
			window.location.assign("login.html");
		})
		.cath();
}



