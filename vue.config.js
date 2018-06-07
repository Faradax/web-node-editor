var ts = require("typescript");

module.exports = {
    customCompilers: {
        ts: function( content , cb ){
            var result = ts.transpileModule( content , {
                compilerOptions: {
                    module: ts.ModuleKind.CommonJS,
                    target: "es2016",
                    strict: true,
                    esModuleInterop: true,
                    experimentalDecorators: true
                }
            });
            cb( null , result.outputText )
        }
    }
}