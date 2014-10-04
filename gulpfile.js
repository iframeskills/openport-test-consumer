var gulp = require( 'gulp' );

var express = require( 'express' );
var path = require( 'path' );
var clean = require('gulp-clean');
var jade = require('gulp-jade');
var openport = require('openport-test');

var EXPRESS_PORT = 8080;

var paths = {
    jade: 'views/jade/',
    html: 'html/'
};

var server = express();
server.set('views', __dirname + "/views");
server.set('view engine', 'jade');

server.use( express.static( path.resolve( './' ) ) );

/* server.get('/:page', function(req, res) { */
server.get('/', function(req, res) {
    if(req.params.page !== "favicon.ico" ){
        res.render('jade/page' /* + req.params.page */, {
            page: req.params.page
        });
    }
});

// Serve
gulp.task( 'serve', function () {
    server.listen( EXPRESS_PORT, function () {
        console.log( "Express started on port " + EXPRESS_PORT );
    } );
} );

// Clean
gulp.task('clean', function() {
    gulp.src(paths.html + "**", {read: false})
        .pipe(clean());
});

// Compile jade to html
gulp.task('jadetohtml', function() {
    var LOCALS = {};
    var JADEFILES = [
        paths.jade + "page.jade",
    ];
    gulp.src(JADEFILES)
        .pipe(jade({
            locals: LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(paths.html));
});

//DEFAULT TASK - gulp
gulp.task( 'default', [ 'serve', 'openport' ] );

// openport usage
gulp.task( 'openport', function () {
    openport( EXPRESS_PORT );
} );
