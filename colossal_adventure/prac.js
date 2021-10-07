function a(string, ...values) {
   if (values.includes(string)) {
       console.log("found");
   }
}

a("a", "a", "b", "c");
