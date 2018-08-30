'use strict';

module.export = class Cipher {
	constructor(inputKey) {
		this.letters = 'abcdefghijklmnopqrstuvwxyz';
		if (inputKey === '') {
			throw new Error('Bad key');
		}
		if (inputKey && (inputKey.toUpperCase() === inputKey || /^\d+$/.test(inputKey))) {
			throw new Error('Bad key');
		} else {
			this.key = inputKey || this.generateRandomKey();
		}
	}

	generateRandomKey() {
		let randomKey = '';
		for (let i = 0; i <= 100; i++) {
			randomKey += this.letters[Math.floor(Math.random() * this.letters.length)];
		}
		return randomKey;
	}

	encode(text) {
		let characters = text.split('');
		let encodechars = [];
		var self = this;
		characters.forEach(function (character, index) {
			let newIndex = self.letters.indexOf(character) + self.letters.indexOf(self.key[index]);
			if (newIndex >= self.letters.length) {
				newIndex -= self.letters.length;
			}
			encodechars.push(self.letters[newIndex]);
		});
		return encodechars.join('');
	}

	decode(cipher) {
		let characters = cipher.split('');
		let decodedChars = [];
		var self = this;
		characters.forEach(function (character, index) {
			let newIndex = self.letters.indexOf(character) - self.letters.indexOf(self.key[index]);
			if (newIndex < 0) {
				newIndex += self.letters.length;
			}
			decodedChars.push(self.letters[newIndex]);
		});
		return decodedChars.join('');
	}
}
