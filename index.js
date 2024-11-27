const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('heroHeader');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from( document.querySelectorAll('.nav__list-link'));
const SERVICE_BOXES = document.querySelectorAll('.service-card__box');
const ACTIVE_LINK_CLASS = 'active';
const BREAKPOINT = 576;

let currentServiceBG = null;
let currentActiveLink = document.querySelector('.nav__list-link.active');

// Remove the active state once the breakpoint is reached
const resetActiveState = ()=>{
  NAV_LIST.classList.remove('nav--active');
  Object.assign(NAV_LIST.style, {
    height: null
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
}

//Add padding to the header to make it visible because navbar has a fixed position.
const addPaddingToHeroHeaderFn = () => {
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
  const HEIGHT_IN_REM = NAV_BAR_HEIGHT / 10;

  // If hamburger button is active, do not add padding
  if (NAV_LIST.classList.contains('nav--active')) {
    return;
  }
  Object.assign(HERO_HEADER.style, {
    paddingTop: HEIGHT_IN_REM + 'rem'
  });
}
addPaddingToHeroHeaderFn();
window.addEventListener('resize', ()=>{
  addPaddingToHeroHeaderFn();

  // When the navbar is active and the window is being resized, remove the active state once the breakpoint is reached
  if(window.innerWidth >= BREAKPOINT){
    addPaddingToHeroHeaderFn();
    resetActiveState();
  }
});

// As the user scrolls, the active link should change based on the section currently displayed on the screen.
window.addEventListener('scroll', ()=>{
  const sections = document.querySelectorAll('#heroHeader, #services, #works, #contact');

  // Loop through sections and check if they are visible
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
    if (window.scrollY >= sectionTop - NAV_BAR_HEIGHT) {
      const ID = section.getAttribute('id');
      const LINK = NAV_LINKS.filter(link => {
        return link.href.includes('#'+ID);
      })[0];
      console.log(LINK);
      currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);
      LINK.classList.add(ACTIVE_LINK_CLASS);
      currentActiveLink = LINK;
    }
  });
});

// Shows & hide navbar on smaller screen
HAMBURGER_BTN.addEventListener('click', ()=>{
  NAV_LIST.classList.toggle('nav--active');
  if (NAV_LIST.classList.contains('nav--active')) {
    Object.assign(document.body.style, {
      overflowY: 'hidden'
    });
    Object.assign(NAV_LIST.style, {
      height: '100vh'
    });
    return;
  }
  Object.assign(NAV_LIST.style, {
    height: 0
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
});

// When navbar link is clicked, reset the active state
NAV_LINKS.forEach(link => {
  link.addEventListener('click', ()=>{
    resetActiveState();
    link.blur();
  })
})

// // Handles the hover animation on services section
// SERVICE_BOXES.forEach(service => {
//   const moveBG = (x, y) => {
//     Object.assign(currentServiceBG.style, {
//       left: x + 'px',
//       top: y + 'px',
//     })
//   }
//   service.addEventListener('mouseenter', (e) => {
//     if (currentServiceBG === null) {
//       currentServiceBG = service.querySelector('.service-card__bg');
//     }
//     moveBG(e.clientX, e.clientY);
//   });
//   service.addEventListener('mousemove', (e) => {
//     const LEFT = e.clientX - service.getBoundingClientRect().left;
//     const TOP = e.clientY - service.getBoundingClientRect().top;
//     moveBG(LEFT, TOP);
//   });
//   service.addEventListener('mouseleave', () => {
//     const IMG_POS = service.querySelector('.service-card__illustration')
//     const LEFT = IMG_POS.offsetLeft + currentServiceBG.getBoundingClientRect().width;
//     const TOP = IMG_POS.offsetTop + currentServiceBG.getBoundingClientRect().height;

//     moveBG(LEFT, TOP);
//     currentServiceBG = null;
//   });
// });

// Handles smooth scrolling
new SweetScroll({
  trigger: '.nav__list-link',
  easing: 'easeOutQuint',
  offset: NAV_BAR.getBoundingClientRect().height - 80
});

document.addEventListener("DOMContentLoaded", function() {
    const codeElement = document.getElementById('typing-text');
    const lines = [
        '<span class="comment glitch" data-text="// Welcome to my portfolio">// Welcome to my portfolio</span>',
        '<span class="keyword">const</span> Jake = {',
        '    <span class="property">name</span>: <span class="string">"Jake"</span>,',
        '    <span class="property">title</span>: <span class="string">"Full Stack Developer"</span>,',
        '    <span class="property">languages</span>: [<span class="string">"JavaScript"</span>, <span class="string">"Python"</span>, <span class="string">"TypeScript"</span>,',
        '    <span class="string">"HTML/CSS"</span>, <span class="string">"SQL"</span>, <span class="string">"Java"</span>, <span class="string">"C/C++"</span>, <span class="string">"C#"</span>],',
        '    <span class="property">tools</span>: [<span class="string">"Git"</span>, <span class="string">"GitHub"</span>, <span class="string">"AWS"</span>, <span class="string">"MongoDB"</span>, <span class="string">"PostgreSQL"</span>, <span class="string">"Linux"</span>,',
        '    <span class="string">"Docker Compose"</span>, <span class="string">"Jira"</span>, <span class="string">"Trello"</span>, <span class="string">"Supabase"</span>, <span class="string">"Websocket"</span>, <span class="string">"Agora"</span>, <span class="string">"Hume AI"</span>],',
        '    <span class="property">frameworks</span>: [<span class="string">"React"</span>, <span class="string">"Node.js"</span>, <span class="string">"Docker"</span>],',
        '    <span class="property">currentlyLearning</span>: <span class="string">"Cloud computing with AWS and Docker for scalable applications."</span>,',
        '    <span class="property">hobbies</span>: [<span class="string">"Coding"</span>, <span class="string">"Problem Solving"</span>, <span class="string">"Project Management"</span>, <span class="string">"Product Development"</span>]',
        '};'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let content = '';
    let currentLineContent = '';

    function typeChar() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            
            if (currentChar < line.length) {
                currentLineContent += line[currentChar];
                codeElement.innerHTML = content + currentLineContent + '<span class="cursor">|</span>';
                currentChar++;
                setTimeout(typeChar, 3); 
            } else {
                content += currentLineContent + '\n';
                currentLineContent = '';
                currentChar = 0;
                currentLine++;
                setTimeout(typeChar, 10); 
            }
        }
    }

    typeChar();
});

// Terminal Animation
class TerminalAnimation {
    constructor(terminalId, commands) {
        this.terminal = document.getElementById(terminalId);
        this.content = this.terminal.querySelector('.terminal-content');
        this.commands = commands;
        this.currentLine = 0;
        this.currentChar = 0;
        this.isTyping = false;
        this.cursor = this.terminal.querySelector('.cursor');
        this.commandHistory = [];
        this.currentHistoryIndex = -1;
    }

    async typeCharacter(char, className) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = char;
        this.content.appendChild(span);
      
        this.cursor.remove();
        this.content.appendChild(this.cursor);
        
        await new Promise(resolve => {
            setTimeout(resolve, Math.random() * 50 + 30);
        });
    }

    async typeCommand(command) {
        await this.typeCharacter('$ ', 'prompt');
        
        for (let char of command) {
            await this.typeCharacter(char, 'command-text');
        }
        await this.typeCharacter('\n', 'command-text');
        
        this.commandHistory.push(command);
        this.currentHistoryIndex = this.commandHistory.length;
    }

    async showOutput(output) {
        if (!output) return;

        await new Promise(resolve => setTimeout(resolve, 200));

        const lines = output.split('\n');
        for (let line of lines) {
            for (let char of line) {
                await this.typeCharacter(char, 'output-text');
            }
            await this.typeCharacter('\n', 'output-text');
        }
    }

    async handleLink(link) {
        if (!link) return;
        
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.target = '_blank';
        linkElement.className = 'terminal-link';
        linkElement.textContent = 'Opening project repository...';
        
        this.content.appendChild(linkElement);
        await this.typeCharacter('\n', 'output-text');
    }

    async executeCommand() {
        if (this.currentLine >= this.commands.length) return;

        const command = this.commands[this.currentLine];
        await this.typeCommand(command.command);
        await this.showOutput(command.output);
        await this.handleLink(command.link);

        await new Promise(resolve => setTimeout(resolve, 800));
        
        this.currentLine++;
        if (this.currentLine < this.commands.length) {
            this.executeCommand();
        }
    }

    start() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.executeCommand();
        }
    }
}

// Terminal commands configuration
const autowiseCommands = [
    {
        command: 'ls',
        output: 'AutoWise/'
    },
    {
        command: 'cd AutoWise',
        output: null
    },
    {
        command: 'cat project_info.txt',
        output: 'Project: AutoWise\nTech Stack: React, Node.js, Python, Web Scraping, PostgreSQL\nStatus: Completed'
    },
    {
        command: 'open github_repo',
        link: 'https://github.com/backhs97/AutoWise'
    }
];

const synczoneCommands = [
    {
        command: 'ls',
        output: 'SyncZone/'
    },
    {
        command: 'cd SyncZone',
        output: null
    },
    {
        command: 'cat project_info.txt',
        output: 'Project: SyncZone\nTech Stack: React Native, Websocket, Agora, P2P, Node.js\nStatus: In Progress'
    },
    {
        command: 'open github_repo',
        link: 'https://github.com/Boroshilov03/SyncZone'
    }
];

const autowiseTerminal = new TerminalAnimation('autowise-terminal', autowiseCommands);
const synczoneTerminal = new TerminalAnimation('synczone-terminal', synczoneCommands);

autowiseTerminal.start();
synczoneTerminal.start();

document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-effect');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

const contactLines = [
    '<span class="comment">// Thanks for visiting my portfolio!</span>',
    '<span class="keyword">const</span> message = {',
    '    gratitude: <span class="string">"Thank you for taking the time to review my work"</span>,',
    '    invitation: <span class="string">"I would love to discuss potential opportunities"</span>,',
    '    contact: {',
    '        email: <span class="string">"jakemib258@gmail.com"</span>,',
    '        github: <span class="string">"https://github.com/backhs97"</span>,',
    '        linkedin: <span class="string">"https://www.linkedin.com/in/jake-back/"</span>',
    '    }',
    '};',
    '',
    '<span class="comment">// Feel free to reach out!</span>'
];

function typeContactCode() {
    const codeElement = document.getElementById('contact-typing-text');
    let content = '';
    let currentLineContent = '';
    let currentLine = 0;
    let currentChar = 0;

    function typeChar() {
        if (currentLine < contactLines.length) {
            const line = contactLines[currentLine];
            
            if (currentChar < line.length) {
                currentLineContent += line[currentChar];
                codeElement.innerHTML = content + currentLineContent + '<span class="cursor">|</span>';
                currentChar++;
                setTimeout(typeChar, 20);
            } else {
                content += currentLineContent + '\n';
                currentLineContent = '';
                currentChar = 0;
                currentLine++;
                setTimeout(typeChar, 80);
            }
        }
    }

    typeChar();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeContactCode();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const contactSection = document.getElementById('contact');
observer.observe(contactSection);

