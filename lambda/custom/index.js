'use strict';
const Alexa = require('alexa-sdk');
const https = require('https');

const APP_ID = "amzn1.ask.skill.dc8f2311-cad2-41f3-baf0-df533e3fecc0";

const handlers = {
    'LaunchRequest': function () {
        this.response.speak("I am A L 3 X A, Human Cyborg Relations." + getRandomQuestion()).listen("I am fluent in more than 6 million languages." + getRandomQuestion());
        this.emit(":responseReady");
    },
    'PersonIntent': function () {
        var spokenValue = getSpokenValue.call(this, "person");
        var resolvedValues = getResolvedValues.call(this, "person");
        
        if (resolvedValues === undefined)
        {
            //NOT FOUND
            this.response.speak("You asked me for a person, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                         .listen("You asked me for a person, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion());
            this.emit(":responseReady");
        }
        else if (resolvedValues.length === 1)
        {
            //DO STUFF
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
            airtableGet("apppkigwqwUExEX5n", "Person", filter, (record) => {
                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                this.response.speak(speechText).listen(getRandomQuestion());
                this.emit(":responseReady");
            });
        }
        else if (resolvedValues.length > 1)
        {
            //CLARIFY
            var valuesString = getValuesString(resolvedValues);
            
            this.response.speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                         .listen("Would you like to know about " + valuesString + "?");
            this.emit(":responseReady");
        }
        
    },
    'LocationIntent': function () {
        var spokenValue = getSpokenValue.call(this, "location");
        var resolvedValues = getResolvedValues.call(this, "location");
        
        if (resolvedValues === undefined)
        {
            //NOT FOUND
            this.response.speak("You asked me for a location, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                         .listen("You asked me for a location, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion());
            this.emit(":responseReady");
        }
        else if (resolvedValues.length === 1)
        {
            //DO STUFF
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
            airtableGet("appbncO8WQwqurkL8", "Location", filter, (record) => {
                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                this.response.speak(speechText).listen(getRandomQuestion());
                this.emit(":responseReady");
            });
        }
        else if (resolvedValues.length > 1)
        {
            //CLARIFY
            var valuesString = getValuesString(resolvedValues);
            
            this.response.speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                         .listen("Would you like to know about " + valuesString + "?");
            this.emit(":responseReady");
        }
    },
    'WeaponIntent': function () {
        var spokenValue = getSpokenValue.call(this, "weapon");
        var resolvedValues = getResolvedValues.call(this, "weapon");
        
        if (resolvedValues === undefined)
        {
            //NOT FOUND
            this.response.speak("You asked me for a weapon, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                         .listen("You asked me for a weapon, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion());
            this.emit(":responseReady");
        }
        else if (resolvedValues.length === 1)
        {
            //DO STUFF
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
            airtableGet("appb66xqCoGVT3rLF", "Weapon", filter, (record) => {
                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                this.response.speak(speechText).listen(getRandomQuestion());
                this.emit(":responseReady");
            });
        }
        else if (resolvedValues.length > 1)
        {
            //CLARIFY
            var valuesString = getValuesString(resolvedValues);
            
            this.response.speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                         .listen("Would you like to know about " + valuesString + "?");
            this.emit(":responseReady");
        }
    },
    'DroidIntent': function () {
        var spokenValue = getSpokenValue.call(this, "droid");
        var resolvedValues = getResolvedValues.call(this, "droid");
        
        if (resolvedValues === undefined)
        {
            //NOT FOUND
            this.response.speak("You asked me for a droid, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                         .listen("You asked me for a droid, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion());
            this.emit(":responseReady");
        }
        else if (resolvedValues.length === 1)
        {
            //DO STUFF
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
            airtableGet("appoMzsJvZKwEiwac", "Droid", filter, (record) => {
                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                this.response.speak(speechText).listen(getRandomQuestion());
                this.emit(":responseReady");
            });
        }
        else if (resolvedValues.length > 1)
        {
            //CLARIFY
            var valuesString = getValuesString(resolvedValues);
            
            this.response.speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                         .listen("Would you like to know about " + valuesString + "?");
            this.emit(":responseReady");
        }
    },
    'VehicleIntent': function () {
        var spokenValue = getSpokenValue.call(this, "vehicle");
        var resolvedValues = getResolvedValues.call(this, "vehicle");
        
        if (resolvedValues === undefined)
        {
            //NOT FOUND
            this.response.speak("You asked me for a vehicle, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                         .listen("You asked me for a vehicle, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion());
            this.emit(":responseReady");
        }
        else if (resolvedValues.length === 1)
        {
            //DO STUFF
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
            airtableGet("appzXe5WBmcw9DkWt", "Vehicle", filter, (record) => {
                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                this.response.speak(speechText).listen(getRandomQuestion());
                this.emit(":responseReady");
            });
        }
        else if (resolvedValues.length > 1)
        {
            //CLARIFY
            var valuesString = getValuesString(resolvedValues);
            
            this.response.speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                         .listen("Would you like to know about " + valuesString + "?");
            this.emit(":responseReady");
        }
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak("I know everything about the Star Wars universe." + getRandomQuestion()).listen(getRandomQuestion());
        this.emit(":responseReady");
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak("Goodbye.");
        this.emit(":responseReady");
    },
    'AMAZON.StopIntent': function () {
        this.response.speak("Goodbye.");
        this.emit(":responseReady");
    },
};

exports.handler = function (event, context, callback) {
    console.log("EVENT = " + JSON.stringify(event));
    console.log("CONTEXT = " + JSON.stringify(context));
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function getRandomQuestion()
{
    var questions = ["What do you want to know?", "How can I be of assistance?", "What can I tell you about the Star Wars universe?", "What can I help you with?"];
    var random = getRandom(0, questions.length-1);
    return "<break time='.5s'/>" + questions[random]; 
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getSpokenValue(slotName)
{
    if (this &&
        this.event &&
        this.event.request &&
        this.event.request.intent &&
        this.event.request.intent.slots &&
        this.event.request.intent.slots[slotName] &&
        this.event.request.intent.slots[slotName].value)
    {
        return this.event.request.intent.slots[slotName].value;    
    }
    else return undefined;
}

function getResolvedValues(slotName)
{
    if (this &&
        this.event &&
        this.event.request &&
        this.event.request.intent &&
        this.event.request.intent.slots &&
        this.event.request.intent.slots[slotName] &&
        this.event.request.intent.slots[slotName].resolutions &&
        this.event.request.intent.slots[slotName].resolutions.resolutionsPerAuthority &&
        this.event.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0] &&
        this.event.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values)
    {
        return this.event.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values;
    }
    else return undefined;
}

function getValuesString(values)
{
    var string = "";
    for (var i = 0;i<values.length; i++)
    {
        if (i != 0) string += ", ";
        if (i === (values.length-1)) string += " or ";
        string += values[i].value.name;
    }
    return string;
}

function airtableGet(base, table, filter, callback) {
    console.log("IN AIRTABLE GET");
    console.log("BASE = " + base);
    console.log("TABLE = " + table);
    console.log("FILTER = " + filter);
    
    
    var options = {
        host: "api.airtable.com",
        port: 443,
        path: "/v0/" + base + "/" + table + "?api_key=keynLGHM8Jor40KNX" + filter,
        method: 'GET',
    };
    
    /*
    var options = {
        host: "66ba1413.ngrok.io",
        port: 443,
        path: "/api/vendor_filter/?zipCode=29601&dateServing=2018-04-17",
        method: 'GET',
    };
    */

    console.log("PATH = https://" + options.host + options.path);

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            var data = JSON.parse(returnData);
            console.log("DATA = " + JSON.stringify(data));
            callback(data);
        });
    });
    req.end();
}