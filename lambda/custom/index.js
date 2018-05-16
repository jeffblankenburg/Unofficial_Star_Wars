'use strict';
const Alexa = require('ask-sdk');
const https = require('https');

const APP_ID = "amzn1.ask.skill.dc8f2311-cad2-41f3-baf0-df533e3fecc0";

const EmptyHandler = {
    canHandle(handlerInput) {
        return false;
    },
    handle(handlerInput, error) {
        return handlerInput.responseBuilder
                .speak()
                .reprompt()
                .getResponse();
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "LaunchRequest";
    },
    handle(handlerInput, error) {
        console.log("IN LAUNCH REQUEST");
        return handlerInput.responseBuilder
            .speak("I am A L 3 X A, Human Cyborg Relations." + getRandomQuestion())
            .reprompt("I am fluent in more than 6 million languages." + getRandomQuestion())
            .getResponse();
  },
};

const PersonHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               handlerInput.requestEnvelope.request.intent.name === "PersonIntent";
    },
    handle(handlerInput, error) {
        console.log("IN PERSON HANDLER");

        var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "person");
        var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "person");
        
        //NO MATCHES FOUND
        if (resolvedValues === undefined)
        {
            return handlerInput.responseBuilder
                   .speak("You asked me for a person, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                   .reprompt("You asked me for a person, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                   .getResponse();
        }
        //ONLY ONE MATCH FOUND
        else if (resolvedValues.length === 1)
        {
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";

            return new Promise((resolve) => {
                airtableGet("apppkigwqwUExEX5n", "Person", filter, (record) => {
                    console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                    var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                    
                    console.log("RESPONSE BUILDER = " + JSON.stringify(handlerInput.responseBuilder));
    
                    resolve(handlerInput.responseBuilder
                       .speak(speechText)
                       .reprompt(getRandomQuestion())
                       .getResponse());
                });
            });
        }
        //MORE THAN ONE MATCH FOUND.  DISAMBIGUATE.
        else if (resolvedValues.length > 1)
        {
            var valuesString = getValuesString(resolvedValues);
            
            return handlerInput.responseBuilder
                   .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                   .reprompt("Would you like to know about " + valuesString + "?")
                   .getResponse();
        }
  }
};

const LocationHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               handlerInput.requestEnvelope.request.intent.name === "LocationIntent";
    },
    handle(handlerInput, error) {
        var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "location");
        var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "location");
        
        if (resolvedValues === undefined)
        {
            return handlerInput.responseBuilder
                   .speak("You asked me for a location, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                   .reprompt("You asked me for a location, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                   .getResponse();
        }
        else if (resolvedValues.length === 1)
        {
            //DO STUFF
            var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
            return new Promise((resolve) => {
                airtableGet("appbncO8WQwqurkL8", "Location", filter, (record) => {
                    console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                    var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                    resolve(handlerInput.responseBuilder
                        .speak(speechText)
                        .reprompt(getRandomQuestion())
                        .getResponse());
                });
            });
        }
        else if (resolvedValues.length > 1)
        {
            var valuesString = getValuesString(resolvedValues);
            
            return handlerInput.responseBuilder
                   .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                   .reprompt("Would you like to know about " + valuesString + "?")
                   .getResponse();
        }
    }
};

const WeaponHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               handlerInput.requestEnvelope.request.intent.name === "WeaponIntent";
    },
    handle(handlerInput, error) {
        var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "weapon");
        var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "weapon");
        
        if (resolvedValues === undefined)
        {
            return handlerInput.responseBuilder
                    .speak("You asked me for a weapon, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                    .reprompt("You asked me for a weapon, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                    .getResponse();
            }
            else if (resolvedValues.length === 1)
            {
                //DO STUFF
                var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
                return new Promise((resolve) => {
                    airtableGet("appb66xqCoGVT3rLF", "Weapon", filter, (record) => {
                        console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                        var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                        resolve(handlerInput.responseBuilder
                            .speak(speechText)
                            .reprompt(getRandomQuestion())
                            .getResponse());
                    });
                });
            }
            else if (resolvedValues.length > 1)
            {
                var valuesString = getValuesString(resolvedValues);
                
                return handlerInput.responseBuilder
                    .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                    .reprompt("Would you like to know about " + valuesString + "?")
                    .getResponse();
            }
        }
    };

    const DroidHandler = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
                handlerInput.requestEnvelope.request.intent.name === "DroidIntent";
        },
        handle(handlerInput, error) {
            var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "droid");
            var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "droid");

            const locale = handlerInput.requestEnvelope.request.locale;
            const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    
            return ms.getInSkillProducts(locale).then(function(res) {

                var category = res.inSkillProducts.filter(record => record.referenceName == "Droid");
                
                //IF USER HAS ACCESS TO THIS PRODUCT
                if (isEntitled(category)) {
                    if (resolvedValues === undefined)
                    {
                        return handlerInput.responseBuilder
                            .speak("You asked me for a droid, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                            .reprompt("You asked me for a droid, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                            .getResponse();
                    }
                    else if (resolvedValues.length === 1)
                    {
                        //DO STUFF
                        var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
                        return new Promise((resolve) => {
                            airtableGet("appoMzsJvZKwEiwac", "Droid", filter, (record) => {
                                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                                resolve(handlerInput.responseBuilder
                                    .speak(speechText)
                                    .reprompt(getRandomQuestion())
                                    .getResponse());
                            });
                        });
                    }
                    else if (resolvedValues.length > 1)
                    {
                        var valuesString = getValuesString(resolvedValues);
                        return handlerInput.responseBuilder
                            .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                            .reprompt("Would you like to know about " + valuesString + "?")
                            .getResponse();
                    }
                }
                else
                {
                    const upsellMessage = "You don't currently own the droid pack. " + category[0].summary + " Want to learn more?";
                    return handlerInput.responseBuilder
                           .addDirective({
                                'type': 'Connections.SendRequest',
                                'name': 'Upsell',
                                'payload': {
                                    'InSkillProduct': {
                                        'productId': category[0].productId
                                    },
                                    'upsellMessage': upsellMessage
                                },
                                'token': 'correlationToken'
                            })
                            .getResponse();
                }
        });
    }
};

const VehicleHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               handlerInput.requestEnvelope.request.intent.name === "VehicleIntent";
    },
    handle(handlerInput, error) {
        var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "vehicle");
        var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "vehicle");
        
        if (resolvedValues === undefined)
        {
            return handlerInput.responseBuilder
                   .speak("You asked me for a vehicle, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                   .reprompt("You asked me for a vehicle, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                   .getResponse();
        }
        else if (resolvedValues.length === 1)
        {
            var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "droid");
            var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "droid");

            const locale = handlerInput.requestEnvelope.request.locale;
            const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    
            return ms.getInSkillProducts(locale).then(function(res) {

                var category = res.inSkillProducts.filter(record => record.referenceName == "Vehicle");
                
                //IF USER HAS ACCESS TO THIS PRODUCT
                if (isEntitled(category)) {
                    if (resolvedValues === undefined)
                    {
                        return handlerInput.responseBuilder
                            .speak("You asked me for a droid, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                            .reprompt("You asked me for a droid, but I wasn't able to find a match for " + spokenValue + ". " + getRandomQuestion())
                            .getResponse();
                    }
                    else if (resolvedValues.length === 1)
                    {
                        //DO STUFF
                        var filter = "&filterByFormula=%7BName%7D%3D%22" + encodeURIComponent(resolvedValues[0].value.name) + "%22";
                        return new Promise((resolve) => {
                            airtableGet("appzXe5WBmcw9DkWt", "Vehicle", filter, (record) => {
                                console.log("AIRTABLE RECORD = " + JSON.stringify(record));
                                var speechText = "You asked me about " + spokenValue + "<break time='.5s'/>" + record.records[0].fields.VoiceDescription + getRandomQuestion();
                                this.response.speak(speechText).listen(getRandomQuestion());
                                this.emit(":responseReady");
                            });
                        });
                    }
                    else if (resolvedValues.length > 1)
                    {
                        var valuesString = getValuesString(resolvedValues);
                        return handlerInput.responseBuilder
                            .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                            .reprompt("Would you like to know about " + valuesString + "?")
                            .getResponse();
                    }
                }
                else
                {
                    const upsellMessage = "You don't currently own the vehicle pack. " + category[0].summary + " Want to learn more?";
                    return handlerInput.responseBuilder
                           .addDirective({
                                'type': 'Connections.SendRequest',
                                'name': 'Upsell',
                                'payload': {
                                    'InSkillProduct': {
                                        'productId': category[0].productId
                                    },
                                    'upsellMessage': upsellMessage
                                },
                                'token': 'correlationToken'
                            })
                            .getResponse();
                }
            });
        }
        else if (resolvedValues.length > 1)
        {
            var valuesString = getValuesString(resolvedValues);
            return handlerInput.responseBuilder
                   .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to know about " + valuesString + "?")
                   .reprompt("Would you like to know about " + valuesString + "?")
                   .getResponse();
        }
    }
};

const HelpHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
    },
    handle(handlerInput, error) {
        console.log("IN " + handlerInput.requestEnvelope.request.intent.name.toUpperCase())
        return handlerInput.responseBuilder
                .speak("I know everything about the Star Wars universe." + getRandomQuestion())
                .reprompt(getRandomQuestion())
                .getResponse();
    }
};

const StopHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
               (handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent");
    },
    handle(handlerInput, error) {
        console.log("IN " + handlerInput.requestEnvelope.request.intent.name.toUpperCase())
        return handlerInput.responseBuilder
                .speak("Goodbye")
                .getResponse();
    }
};

//THIS HANDLES THE CONNECTIONS.RESPONSE EVENT AFTER A BUY OCCURS.
const UpsellResponseHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "Connections.Response" &&
               handlerInput.requestEnvelope.request.name === "Upsell";
    },
    handle(handlerInput) {
        console.log("IN UPSELLRESPONSEHANDLER");
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const productId = handlerInput.requestEnvelope.request.payload.productId;

        if (handlerInput.requestEnvelope.request.status.code == 200) {
            if (handlerInput.requestEnvelope.request.payload.purchaseResult == 'DECLINED') {
                return ms.getInSkillProducts(locale).then(function(res) {
                    let product = res.inSkillProducts.filter(record => record.productId == productId);

                    const speakResponse = "I can tell you about any of the people in the Star Wars universe any time, but to hear about " + product[0].referenceName + "s, you need to purchase the " + product[0].referenceName + " pack." + getRandomQuestion();
                    const repromptResponse = getRandomQuestion();
                    return handlerInput.responseBuilder
                        .speak(speakResponse)
                        .reprompt(repromptResponse)
                        .getResponse();
                });
            }
        }
        else    {
            // Something failed.
            console.log('Connections.Response indicated failure. error:' + handlerInput.requestEnvelope.request.status.message);
            return handlerInput.responseBuilder
                .speak("There was an error handling your purchase request. Please try again or contact us for help.")
                .getResponse();
        }
   }
};


const BuyHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        var spokenValue = getSpokenValue(handlerInput.requestEnvelope, "product");
        var resolvedValues = getResolvedValues(handlerInput.requestEnvelope, "product");

        if (resolvedValues === undefined)
        {
            return handlerInput.responseBuilder
                   .speak("It sounded like you are asking to buy the " + spokenValue + " pack, but that's not something we have to offer.  You can currently buy the droid pack. " + getRandomQuestion())
                   .reprompt("It sounded like you are asking to buy the " + spokenValue + " pack, but that's not something we have to offer.  You can currently buy the droid pack. " + getRandomQuestion())
                   .getResponse();
        }
        else if (resolvedValues.length === 1)
        {
            return ms.getInSkillProducts(locale).then(function(res) {
                let product = res.inSkillProducts.filter(record => record.referenceName.toLowerCase() == resolvedValues[0].value.name.toLowerCase());
                return handlerInput.responseBuilder
                        .addDirective({
                            'type': 'Connections.SendRequest',
                            'name': 'Buy',
                            'payload': {
                                        'InSkillProduct': {
                                            'productId': product[0].productId
                                        }
                            },
                            'token': 'correlationToken'
                        })
                .getResponse();
            });
        }
        else
        {
            var valuesString = getValuesString(resolvedValues);
            return handlerInput.responseBuilder
                   .speak("You asked me about " + spokenValue + ", and I found multiple answers.  Would you like to buy the " + valuesString + "?")
                   .reprompt("Would you like to buy the " + valuesString + "?")
                   .getResponse();
        }
    }
};

const BuyResponseHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "Connections.Response" &&
               handlerInput.requestEnvelope.request.name === "Buy";
    },
    handle(handlerInput) {
  
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const productId = handlerInput.requestEnvelope.request.payload.productId;
  
        return ms.getInSkillProducts(locale).then(function(res) {
            let product = res.inSkillProducts.filter(record => record.productId == productId);
  
            if (handlerInput.requestEnvelope.request.status.code == 200) {
                if (handlerInput.requestEnvelope.request.payload.purchaseResult == 'ACCEPTED') {
                    
                    const speakResponse = "You have successfully purchased the " + product[0].name + "!  Which " + product[0].referenceName + " would you like to know about?";
                    const repromptResponse = "What else would you like to know?";
                    return handlerInput.responseBuilder
                        .speak(speakResponse)
                        .reprompt(repromptResponse)
                        .getResponse();
                }
                else if (handlerInput.requestEnvelope.request.payload.purchaseResult == 'DECLINED') {
                    const speakResponse = "Thanks for your interest in the " + product[0].name + ".  What else would you like to know about?";
                    const repromptResponse = "What else would you like to learn about?";
                    return handlerInput.responseBuilder
                        .speak(speakResponse)
                        .reprompt(repromptResponse)
                        .getResponse();
                }
            }
            else    {
                // Something failed.
                console.log('Connections.Response indicated failure. error:' + handlerInput.requestEnvelope.request.status.message);
                
                return handlerInput.responseBuilder
                    .speak("There was an error handling your purchase request. Please try again or contact us for help.")
                    .getResponse();
            }
        });
   }
  };

const SessionEndedHandler = { 
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log("IN SESSIONENDEDHANDLER");
              return handlerInput.responseBuilder
                  .speak(getRandomGoodbye())
                  .getResponse();
     }
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

function getSpokenValue(envelope, slotName)
{
    if (envelope &&
        envelope.request &&
        envelope.request.intent &&
        envelope.request.intent.slots &&
        envelope.request.intent.slots[slotName] &&
        envelope.request.intent.slots[slotName].value)
    {
        return envelope.request.intent.slots[slotName].value;    
    }
    else return undefined;
}

function getResolvedValues(envelope, slotName)
{
    if (envelope &&
        envelope.request &&
        envelope.request.intent &&
        envelope.request.intent.slots &&
        envelope.request.intent.slots[slotName] &&
        envelope.request.intent.slots[slotName].resolutions &&
        envelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority &&
        envelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0] &&
        envelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values)
    {
        return envelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values;
    }
    else return undefined;
}

function getSlotName(envelope)
{
    if (envelope &&
        envelope.request &&
        envelope.request.intent &&
        envelope.request.intent.slots &&
        envelope.request.intent.slots[0] &&
        envelope.request.intent.slots[0].name)
    {
        return envelope.request.intent.slots[0].name;
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

function isProduct(product)
{
    return product &&
           product.length > 0;
}

function isEntitled(product)
{
    return isProduct(product) &&
           product[0].entitled == 'ENTITLED';
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

const RequestLog = {
    process(handlerInput) {
        console.log("REQUEST ENVELOPE = " + JSON.stringify(handlerInput.requestEnvelope));    
        return;
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log("Error handled: " + JSON.stringify(error.message));
        console.log('handlerInput:' + JSON.stringify(handlerInput));
        return handlerInput.responseBuilder
            .speak('Sorry, I seem to have encountered some corrupted data files.  I need to power down.')
            .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.standard() 
.addRequestHandlers(
    LaunchRequestHandler,
    PersonHandler,
    LocationHandler,
    DroidHandler,
    WeaponHandler,
    VehicleHandler,
    UpsellResponseHandler,
    BuyHandler,
    BuyResponseHandler,
    HelpHandler,
    StopHandler,
    SessionEndedHandler    
  )
.addRequestInterceptors(RequestLog)
.addErrorHandlers(ErrorHandler)
.lambda();