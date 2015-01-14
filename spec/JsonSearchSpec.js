// Generated by CoffeeScript 1.8.0
(function() {
  describe('JsonSearch', function() {
    return describe('reading json', function() {
      afterEach(function() {
        return JsonSearch.clear();
      });
      it('reads one level json correctly', function() {
        var json;
        json = {
          "one": "one",
          "two": 2,
          "three": "three"
        };
        JsonSearch.read(json);
        return expect(JsonSearch.levels[0]).toEqual({
          "one": String,
          "two": Number,
          "three": String
        });
      });
      it('reads two level json correctly', function() {
        var json;
        json = {
          "str": "just string",
          "obj": {
            "nested_string": "string1",
            "nested_number": 1
          },
          "obj2": {
            "nested_two": "string1",
            "nested_number": 1
          },
          "number": 3
        };
        JsonSearch.read(json);
        expect(JsonSearch.levels[0]).toEqual({
          "str": String,
          "obj": Object,
          "obj2": Object,
          "number": Number
        });
        return expect(JsonSearch.levels[1]).toEqual({
          "nested_string": String,
          "nested_two": String,
          "nested_number": Number
        });
      });
      it('reads three levels json correctly', function() {
        var json;
        json = {
          "str": "just string",
          "obj": {
            "nested_string": "string1",
            "double_nested": {
              "double_nested_no": 2
            }
          },
          "obj2": {
            "nested_two": "string1",
            "nested_number": 1
          },
          "number": 3
        };
        JsonSearch.read(json);
        expect(JsonSearch.levels[0]).toEqual({
          "str": String,
          "obj": Object,
          "obj2": Object,
          "number": Number
        });
        expect(JsonSearch.levels[1]).toEqual({
          "nested_string": String,
          "double_nested": Object,
          "nested_two": String,
          "nested_number": Number
        });
        return expect(JsonSearch.levels[2]).toEqual({
          "double_nested_no": Number
        });
      });
      return it('shows the correct depth of json', function() {
        var json;
        json = {
          "str": "just string",
          "obj": {
            "nested_string": "string1",
            "double_nested": {
              "double_nested_no": 2
            }
          },
          "obj2": {
            "nested_two": "string1",
            "nested_number": 1
          },
          "number": 3
        };
        JsonSearch.read(json);
        return expect(JsonSearch.depth()).toEqual(3);
      });
    });
  });

  describe('TypeChecking', function() {
    it('should show number types correctly', function() {
      expect(typeOf(1)).toEqual(Number);
      return expect(typeOf(3.1)).toEqual(Number);
    });
    it('should show string types correctly', function() {
      return expect(typeOf("string")).toEqual(String);
    });
    it('should show object types correctly', function() {
      return expect(typeOf({})).toEqual(Object);
    });
    it('should show function types correctly', function() {
      var my_func;
      my_func = function() {};
      return expect(typeOf(my_func)).toEqual(Function);
    });
    it('should show array types correctly', function() {
      return expect(typeOf([])).toEqual(Array);
    });
    it('should show date types correctly', function() {
      var date;
      date = new Date();
      return expect(typeOf(date)).toEqual(Date);
    });
    it('should show date types correctly', function() {
      var boo;
      boo = true;
      return expect(typeOf(boo)).toEqual(Boolean);
    });
    it('should show date types correctly', function() {
      var reg;
      reg = new RegExp();
      return expect(typeOf(reg)).toEqual(RegExp);
    });
    return it('should show error types correctly', function() {
      var err;
      err = new Error();
      return expect(typeOf(err)).toEqual(Error);
    });
  });

  describe('Json Merging', function() {
    it('merges empty json over a goood json', function() {
      var base, to_merge;
      base = {
        "something": "somewhere"
      };
      to_merge = {};
      return expect(JsonSearch._json_merge(base, to_merge)).toEqual({
        "something": "somewhere"
      });
    });
    return it('merges a good json over an empty json', function() {
      var base, to_merge;
      base = {};
      to_merge = {
        "something": "somewhere"
      };
      return expect(JsonSearch._json_merge(base, to_merge)).toEqual({
        "something": "somewhere"
      });
    });
  });

}).call(this);
