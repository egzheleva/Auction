/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var CAMPAIGNS_FILE = path.join(__dirname, 'campaigns.json');
var USERS_FILE = path.join(__dirname, 'users.json');


app.set('port', (process.env.PORT || 9000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    res.setHeader('Access-Control-Max-Age', 3600 ); // 1 hour
    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/campaigns', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/campaign', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var campaigns = JSON.parse(data);
   
    var newCampaign = {
      id: Date.now(),
      name: req.body.name,
      descr: req.body.descr,
    };
    campaigns.push(newCampaign);
    fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(201).location(`/api/campaigns/${newCampaign.id}`).json(newCampaign);
    });
  });
});


app.get('/api/campaigns/:campaignId/items/:itemId', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var campaigns = JSON.parse(data);
    const campaignId = +req.params.campaignId;
    const itemId = +req.params.itemId;
    const index = campaigns.findIndex(c => c.id === campaignId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `Campaign with ID=${campaignId} not found.`});
      return;
    }
    const campaign = campaigns[index];
    let currentItem = campaign.items[0];
    for(const item of campaign.items) {
      if(item.id === itemId) {
        currentItem = item;
      }
    }
    console.log(campaignId  + 'itemId:' + itemId + 'campaign:' +campaign + 'item:' + currentItem);
    fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(currentItem); //200 OK with comment in the body
    });
  });
});

app.get('/api/campaigns/:id', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var campaigns = JSON.parse(data);
    const campaignId = +req.params.id;
    const index = campaigns.findIndex(c => c.id === campaignId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `Campaign with ID=${campaignId} not found.`});
      return;
    }
    const campaign = campaigns[index];
    
    fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(campaign); //200 OK with comment in the body
    });
  });
});

app.get('/api/items/:id', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var campaigns = JSON.parse(data);
    const campaignId = +req.params.id;
    const index = campaigns.findIndex(c => c.id === campaignId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `Campaign with ID=${campaignId} not found.`});
      return;
    }
    const campaign = campaigns[index];
    
    fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(campaign); //200 OK with comment in the body
    });
  });
});

app.get('/api/items/bid/:userId', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var campaigns = JSON.parse(data);
    const bidderId = +req.params.userId;
    let biddedItems = [];

    for(c of campaigns) {
      if(c.items) {
        for(i of c.items) {
          if(i.bidderId && i.bidderId === bidderId) {
            biddedItems.push(i);
          }
        }
      }
    }

    res.json(biddedItems);
  });
});


app.put('/api/item/:id', function(req, res) {
  fs.readFile(CAMPAIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var campaigns = JSON.parse(data);
    const currentItemId = +req.params.id;
    const campaignId = +req.body.campaignId;
    const newPrice = +req.body.currentPrice;
    const bidderId = 1;
    

    const index = campaigns.findIndex(c => c.id === campaignId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `Item with ID=${currentItemId} not found.`});
      return;
    }
    let itemCampaign = campaigns[index];

    console.log("item campaign:" + itemCampaign);
    let updatedItem = null;

    for (let i =0; i < itemCampaign.items.length; i++) {
       if(itemCampaign.items[i].id === currentItemId) {
         itemCampaign.items[i].currentPrice = newPrice;
         itemCampaign.items[i].bidderId = bidderId;
         updatedItem = itemCampaign.items[i];
       }
    }
    campaigns[index] = itemCampaign;


    fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(updatedItem); //200 OK with comment in the body
    });
  });
});


app.get('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});


app.post('/api/users/add', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var users = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newUser = {
      id: Date.now(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: 'registered'
    };
    users.push(newUser);
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(201).location(`/api/users/${newUser.id}`).json(newUser);
    });
  });
});


app.delete('/api/users/:id', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let users = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    const userId = +req.params.id;
    const index = users.findIndex(u => u.id === userId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `User with ID=${userId} not found.`});
      return;
    }
    const deleted = users[index]
    users.splice(index, 1);
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(deleted); //200 OK with deleted comment in the body
    });
  });
});



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/api/campaigns');
});
