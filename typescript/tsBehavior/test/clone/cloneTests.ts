import { assert } from "chai";

class SimpleTestClass {
  public samplePublicField: string;
  public constructorCalled: boolean = false;

  private samplePropertyField: string;

  get sampleProperty(): string {
    return this.samplePropertyField;
  }
  set sampleProperty(val: string) {
    this.samplePropertyField = val;
  }

  constructor() {
    this.constructorCalled = true;
  }

  public reverseField(): string {
    return this.samplePublicField.split(/./).reverse().join("");
  }
}



suite("clone", () => {

  suite("using spreadoperator", () => {

    function clone<T>(source: {}): T {
      const copy = { ...source };
      return copy as T;
    }

    test("with SimpleTestClass", () => {
      const sut = new SimpleTestClass();
      sut.samplePublicField = "public field";
      sut.sampleProperty = "public property";
      sut.constructorCalled = !sut.constructorCalled; // reset because other wise it will be copied as a public field

      const clonedSut: SimpleTestClass = clone<SimpleTestClass>(sut);

      // Public fields will be cloned
      assert.equal(clonedSut.samplePublicField, sut.samplePublicField);

      // property, methods and type information is missing in the clone
      // also the constructor will not be called
      assert.notInstanceOf(clonedSut, SimpleTestClass);
      assert.notEqual(clonedSut.sampleProperty, sut.sampleProperty);
      assert.isFalse(clonedSut.constructorCalled);
      assert.isUndefined(clonedSut.reverseField);
    });
  });

  suite("using ES5-Object", () => {

    function clone(source: SimpleTestClass): SimpleTestClass {
      const obj = Object.create(SimpleTestClass);
      return Object.assign(obj, { ...source }) as SimpleTestClass;

    }

    test("with SimpleTestClass", () => {
      const sut = new SimpleTestClass();
      sut.samplePublicField = "public field";
      sut.sampleProperty = "public property";
      sut.constructorCalled = !sut.constructorCalled; // reset because other wise it will be copied as a public field

      const clonedSut: SimpleTestClass = clone(sut);

      // Public fields will be cloned
      assert.equal(clonedSut.samplePublicField, sut.samplePublicField);

      // using Object.assign + and Object.createwe get a real SimpleClass
      // property, methods and type information is missing in the clone
      // also the constructor will not be called
      assert.notInstanceOf(clonedSut, SimpleTestClass);
      assert.notEqual(clonedSut.sampleProperty, sut.sampleProperty);
      assert.isFalse(clonedSut.constructorCalled);
      assert.isUndefined(clonedSut.reverseField);
    });
  });
});
