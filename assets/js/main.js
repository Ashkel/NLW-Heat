const linksSocialMedia = {
	github: 'Ashkel',
	youtube: 'channel/UC6zYGLM0JzJ8B7yjEd0Suqw',
	facebook: 'diegowesley.demello',
	instagram: 'diegowesley867',
	twitter: 'blacktwister_n',
};

let utils = {};

// altera os "botões" do social media
utils.changeSocialMediaLinks = () => {
	// itera os filhos da ul#socialMedia
	for (let li of socialMedia.children) {
		// pega a classe da li
		const social = li.getAttribute('class');

		// altera o link de cada botão, usando a classe da li
		// e os dados do objeto linksSocialMedia
		li.children[0].href = `https://${social}.com/${linksSocialMedia[social]}`;
	}
};

// preencher os dados do github na pagina
utils.getGithubUserProfile = user => {
	const url = `https://api.github.com/users/${user}`;

	// chamada para a api do github que retorna uma promise,
	// que deve ser tratada com then e catch
	fetch(url)
		.then(response => response.json())
		.then(data => {
			userName.textContent = data.name;
			userAvatar.src = data.avatar_url;
			userGithub.href = data.html_url;
			userLogin.textContent = data.login;
			userBio.textContent = data.bio;
		})
		.catch(err => console.log(err));
};

// Altera o título da página
utils.setPageTitle = title =>{
	document.title = title;
}

utils.changeSocialMediaLinks();
utils.getGithubUserProfile(linksSocialMedia['github']);
utils.setPageTitle(`NLW Heat - ${userName.textContent}`);
