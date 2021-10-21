const linksSocialMedia = {
	name: 'Diego Wesley',
	github: 'Ashkel',
	youtube: 'channel/UC6zYGLM0JzJ8B7yjEd0Suqw',
	facebook: 'diegowesley.demello',
	instagram: 'diegowesley867',
	twitter: 'blacktwister_n',
};

userName.textContent = linksSocialMedia.name;

function changeSocialMediaLinks() {
	for (let li of socialMedia.children) {
		const social = li.getAttribute('class');

		li.children[0].href = `https://${social}.com/${linksSocialMedia[social]}`;
	}
}

changeSocialMediaLinks();

// change back if this breaks on earlier devices
let utils = {};

utils.get = url => {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();

		request.open('GET', url);

		request.onload = function () {
			// handle both remote 200 responses and local zero responses...
			if (request.status == 200) {
				resolve(request.response);
			} else {
				reject(Error(`promise error with status: ${request.status}`));
			}
		};

		request.onerror = function (err) {
			reject(Error(`Network Error with ${url} -> ${err}`));
		};

		request.send();
	});
};

utils.getJSON = async function (url) {
	let data = {};

	let string = null;

	try {
		string = await utils.get(url);
	} catch (e) {
		alert(`error: ${e}`);
	}

	try {
		data = JSON.parse(string);
	} catch (e) {
		alert(`parse error: ${e}`);
	}

	return data;
};

utils
	.getJSON(`https://api.github.com/users/${linksSocialMedia['github']}`)
	.then(function (data) {
		try {
			userName.textContent = data.name;
			userAvatar.setAttribute('src', data.avatar_url);
			githubLogin.textContent = data.login;
			githubBio.textContent = data.bio;
		} catch (e) {
			alert(`error: ${e}`);
		}
	})
	.catch(function (err) {
		console.log(err);
	});
