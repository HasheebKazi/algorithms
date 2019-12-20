# a set is an un ordered collection of things
# its a well defined collection and thus you must specify the things that belong in a set
# all other things are exclueded from the set
# a category of well defined things, as long as you can define the category somehow (rule, definition, enumeration, relationship) you can have a set of things
# any given object can belong to any number of sets 

# understand and implement sets, then read the python docs
# a set also stores unique value ( each thing only appear once in a set (it belongs or it doesnt, there can't be multiples of the same thing))
class set_():
    def __init__(self, iterable):
        self.length = 0;
        self.collection = [];
        for x in iterable:
            self.collection.append(x);
            self.length = self.length + 1;
    
    def __len__(self, value):
        return self.length;
    
    def contains(self, element):
        pass

    def add(self, element):
        pass

    def remove(self, element):
        pass

    def equals(self, element):
        pass

    def isSubsetOf(self, setB):
        pass

    def union(self, sestB):
        pass

    def intersect(self, setB):
        pass

    def differenc(self, setB):
        pass

    def iterator(self):
        pass
    

