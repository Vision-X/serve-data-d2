const express = require('express');
const instructors = require('./data/instructors');
const cors = require('cors');
const app = express();


function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i];
        }
    }
    return null;
}

function findByFullName(data, fullName) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].fullName == fullName) {
            return data[i];
        }
    }
    return null;
}

app.use(cors());

app.get("/", function(req, res) {
    res.json({data: instructors});
})

app.get("/:id", function(req, res) {
    let currentInstructor = findById(instructors, req.params.id);
    if (!currentInstructor) {
        res.status(404);
        res.json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        res.json({data: currentInstructor});
    }
})

app.get("/:fullName", function(req, res) {
    let instructorName = findByFullName(instructors, req.params.fullName);
    if (!instructorName) {
        res.status(404);
        res.json({
            error: {
                message: "Nobody named that here buddy!"
            }
        });
    } else {
        res.json({data: instructorName});
    }
})



app.listen(process.env.PORT || 8000);
