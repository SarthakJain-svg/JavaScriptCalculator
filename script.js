var finalResult = false;
function getHistory()
{
	return document.getElementById("history-value").innerText;
}

function printHistory(num)
{
	document.getElementById("history-value").innerText = num;
}

function getOutput()
{
	return document.getElementById("output-value").innerText;
}

function printOutput(num)
{
	if(num === "")
	{
		document.getElementById("output-value").innerText = num;
	}
	else if(num.toString().includes('.'))
	{
		document.getElementById("output-value").innerText = num;
	}
	else
	{
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}
}

function getFormattedNumber(num)
{
	return Number(num).toLocaleString("en");
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++)
{
	operator[i].addEventListener('click', function() {
		if(this.id === "clear")
		{
			printHistory("");
			printOutput("0");
		}
		else if(this.id === "backspace")
		{
			var res = getOutput().replace(/,/g, '');
			if(res.includes('-') && res.length === 2)
			{
				printOutput("0");
			}
			else
			{
				printOutput(res.substr(0, res.length - 1));
				if(res.length === 1)
				{
					printOutput("0");
				}
			}
		}
		else if(this.id === "plusMinus")
		{
			var result = getOutput().replace(/,/g, '');
			if(result.includes('-'))
			{
				printOutput(result.substr(1, result.length));
			}
			else
			{
				if(result !== "0")
				{
					printOutput("-" + result);
				}
			}
		}
		else if(this.id === ".")
		{
			if(!getOutput().includes('.'))
			{
				if(finalResult)
				{
					printOutput("0.");
				}
				else
				{
					printOutput(getOutput() + ".");
				}
			}
			else
			{
				printOutput("0.");
			}
		}
		else
		{
			if(this.id !== "=")
			{
				if(getHistory() && getOutput())
				{
					printHistory(eval(getHistory() + " " + getOutput()) + " " + this.id);
				}
				else
				{
					if(getHistory())
					{
						var output = getHistory().substr(0, getHistory().length - 1) + this.id;
					}
					else
					{
						var output = getOutput().replace(/,/g, '') + " " + this.id;
					}
					printHistory(output);
				}
				printOutput("");
			}
			else
			{
				if(getOutput())
				{
					if(getOutput() === "0")
					{
						printOutput("0");
					}
					else
					{
						printOutput(eval(getHistory() + " " + getOutput()));
					}
					printHistory("");
					finalResult = true;
				}
			}
		}
	});
}

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++)
{
	number[i].addEventListener('click', function() {
		if(finalResult)
		{
			printOutput("");
			finalResult = false;
		}
		printOutput(getOutput().replace(/,/g, '') + this.id);
	});
}