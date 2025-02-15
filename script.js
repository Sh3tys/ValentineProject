document.addEventListener("DOMContentLoaded", () => {
  const yesButton = document.getElementById("yes");
  const noButton = document.getElementById("no");
  const noHitbox = document.getElementById("no-hitbox");
  const body = document.body;
  const backgroundMusic = document.getElementById("background-music");

  //Modification du volume de la musique de fond
  backgroundMusic.volume = 0.3;

  let confettiCount = 0;
  let clickCount = 0;

  // Position initiale du bouton "Non"
  function setInitialPosition() {
    const yesRect = yesButton.getBoundingClientRect();
    noButton.style.left = `${yesRect.right + 20}px`;
    noButton.style.top = `${yesRect.top}px`;
    noHitbox.style.left = `${yesRect.right}px`;
    noHitbox.style.top = `${yesRect.top}px`;
  }

  // Déplace constamment le bouton "Non" pour qu'il soit impossible à atteindre
  function moveButton() {
    const x = Math.random() * (window.innerWidth - noButton.clientWidth);
    const y = Math.random() * (window.innerHeight - noButton.clientHeight);
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    noHitbox.style.left = `${x - 50}px`;
    noHitbox.style.top = `${y - 50}px`;
  }

  // Fonction pour générer des confettis au clic
  function createConfetti(e) {
    const numConfetti = 10 + confettiCount;
    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement("div");
      const angle = Math.random() * 360;
      const distance = Math.random() * 100 + 50;
      const x = distance * Math.cos(angle);
      const y = distance * Math.sin(angle);

      confetti.classList.add("confetti");
      confetti.style.left = `${e.clientX - 5}px`;
      confetti.style.top = `${e.clientY - 5}px`;
      confetti.style.setProperty("--x", `${x}px`);
      confetti.style.setProperty("--y", `${y}px`);
      body.appendChild(confetti);

      // Supprimer les confettis après leur animation
      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
    if (confettiCount < 150) {
      confettiCount += 5;
    } else {
      console.log("limite atteint");
    }
  }

  // Fonction pour faire pleuvoir des confettis du haut de la page
  function rainConfetti() {
    const numConfetti = 50;
    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      const x = Math.random() * window.innerWidth;
      confetti.style.left = `${x}px`;
      confetti.style.top = `-20px`;
      body.appendChild(confetti);

      // Supprimer les confettis après leur animation
      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
  }

  // Lorsque l'utilisateur clique sur "Oui"
  yesButton.addEventListener("click", (e) => {
    clickCount++;
    if (clickCount >= 10) {
      createConfetti(e);
      // Faire pleuvoir des confettis toutes les 0.2 secondes après 10 clics
      if (!window.rainInterval) {
        window.rainInterval = setInterval(rainConfetti, 200);
      }
    } else {
      createConfetti(e);
    }
  });

  // Fonction pour désactiver et déplacer le bouton "Non"
  function disableNoButton() {
    noButton.style.pointerEvents = "none";
    moveButton();
    setTimeout(disableNoButton, 1000);
  }

  noHitbox.addEventListener("mouseover", moveButton);

  setInitialPosition();
  disableNoButton();
});
