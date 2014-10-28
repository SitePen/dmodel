The purpose of this document is to explain the following goals and design decisions in dmodel:

* Validation and properties - The goal of dmodel is to make declaration of validated properties as easy as possible. There are a couple of approaches we considered, including keeping validators in a separate array, and mixing in the functionality in properties. We opted to allow both approaches because each has some key advantages. Validation in arrays provides:
  * Clear distinct list of validators
  * No conflicts between validators
  * Multiple asynchronous validators can easily be combined
Validators also extend properties, can be mixed in, can be used directly as properties or mixed in to property classes, with the following benefits:
  * A single constructor for a property with validation provided
  * Encapsulate all the property concerns in a single class/instance
  * Metadata about validation (required, type, min, max, etc.), is directly available as metadata properties that can easily be accessed by consumers
  * Property reuse between validators (that are mixed in)
  * Full inheritance capabilities provide more complex possibilities of validators, including integration with other aspects of a property (like coercion)

* binding - While dmodel was still part of dstore, we added a bindTo method to the Model class in the bindTo branch (https://github.com/SitePen/dstore/tree/bindTo) based on the idea of giving a target to bind a property to. After implementing this, I am not sure I really like this API though. The fact that the bindTo has a potential side effects if an existing binding exists seems like it makes for an unpredictable and awkward interface.
