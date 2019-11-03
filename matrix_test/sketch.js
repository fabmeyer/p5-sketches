var symbolSize = 24;
var streams = [];
var clock = 0;

function setup() {
    createCanvas(
        640,
        480
    );
    background(0);
    var x = 0;
    for (var i = 0; i <= (width / symbolSize); i++) {
        stream = new Stream();
        stream.generateSymbols(x, round(random(-500, height)));
        streams.push(stream);
        x += 1.5 * symbolSize;
    }
    textSize(symbolSize);
}

function draw() {
    background(0, 163);
    streams.forEach(function(stream) {
        stream.render();
    })
    if (clock < 360) { clock++;
    } else clock = 0;
}

function Symbol(x, y, speed, green, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.green = green;
    this.switchInterval = round(random(1, 100));
    this.first = first;

    this.setToRandomSymbol = function() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 0x0060))
            );
        }
    }

    this.rain = function() {
        if (this.green < 255) {
            this.green++;
        }

        if (this.y >= height) {
            this.y = 0;
            this.green = round(random(0, 255));
        } else {
            this.y += this.speed;
        }
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(2, 20));
    this.speed = random(3, 12);
    var first;

    this.generateSymbols = function(x, y) {
        this.first = true;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            this.first = false;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (this.first) {
                fill(180, 255, 180);
            } else {
                fill(0, symbol.green, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
