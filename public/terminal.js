function executeCommand() {
    const commandInput = document.getElementById('command');
    const command = commandInput.value;
    const terminal = document.getElementById('terminal');

    // Clear command input
    commandInput.value = '';

    // Create a new command output element
    const commandOutput = document.createElement('div');
    commandOutput.className = 'output';

    // Check for specific commands
    if (command.toLowerCase() === 'help') {
        commandOutput.textContent = 'Available commands: help, clear, date, ping, admin, quote, dice, fortune, calculator';
    } else if (command.toLowerCase() === 'clear') {
        terminal.innerHTML = '';
        return;
    } else if (command.toLowerCase() === 'date') {
        const currentDate = new Date().toLocaleString();
        commandOutput.textContent = `Current date and time: ${currentDate}`;
    } else if (command.toLowerCase().startsWith('ping')) {
        const args = command.split(' ');
        if (args.length < 2) {
            commandOutput.textContent = 'Usage: ping <host>';
        } else {
            const host = args[1];
            commandOutput.textContent = `Pinging ${host}...`;
            // Simulate a delay to mimic network latency
            setTimeout(() => {
                const success = Math.random() < 0.8; // 80% success rate
                if (success) {
                    commandOutput.textContent += '\nReply from ' + host + ': bytes=32 time=10ms TTL=64';
                } else {
                    commandOutput.textContent += '\nRequest timed out.';
                }
                // Append command output to terminal
                terminal.appendChild(commandOutput);
                // Scroll to the bottom
                terminal.scrollTop = terminal.scrollHeight;
            }, Math.random() * 3000); // Random delay up to 3 seconds
            return;
        }
    } else if (command.toLowerCase() === 'admin') {
        commandOutput.textContent = 'No Admin Found';
    } else if (command.toLowerCase() === 'quote') {
        fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
            .then(response => response.json())
            .then(data => {
                const quoteText = data.quoteText;
                const quoteAuthor = data.quoteAuthor || 'Unknown';
                commandOutput.textContent = `"${quoteText}" - ${quoteAuthor}`;
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                commandOutput.textContent = 'Failed to fetch quote. Please try again later.';
            });
    } else if (command.toLowerCase() === 'dice') {
        const diceResult = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
        commandOutput.textContent = `You rolled a ${diceResult}!`;
    } else if (command.toLowerCase() === 'fortune') {
        const fortunes = [
            'You will find great success in your endeavors.',
            'A pleasant surprise awaits you.',
            'You will make new friends in the near future.',
            'Good things come to those who wait.',
            'An exciting opportunity will present itself soon.'
        ];
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        commandOutput.textContent = randomFortune;
    } else if (command.toLowerCase() === 'calculator') {
        try {
            const expression = prompt('Enter an arithmetic expression:');
            const result = eval(expression);
            commandOutput.textContent = `Result: ${result}`;
        } catch (error) {
            console.error('Error evaluating expression:', error);
            commandOutput.textContent = 'Invalid expression. Please try again.';
        }
    } else {
        commandOutput.textContent = `Command not recognized: ${command}`;
    }

    // Append command output to terminal
    terminal.appendChild(commandOutput);

    // Scroll to the bottom
    terminal.scrollTop = terminal.scrollHeight;
}
