### Why?

All previous objects (and, or, xor, mux, alu) can be treated as a function.

But DFF is not, since it have to hold information.

It has to remember the previous state to give you information.

```ruby
dff({input: 1, load: false})
#=> gives you the previous state, not this input value
#=> some how dff have to remember the input.
```

To remember the previous input, CFG is also such a thing.

to recognize (^i)^i, you have to keep the number of (.

So you can't throw away the pattern after seeing it.

To make this computer Turing Complete, this is a necessary step to go.

Memory is also used to distinguish TIME, from past to now.

### How?

Instead to use functions, we have to use objects, and pass the objects to hold the data.

To make object creating and updating more easily and logically, let's write our program in Class.

### Techniques

The ram is a good example of tool using.

you use ram8 as parts of ram64 then ram512

this is quite intelligent.

# Thoughts:

Whenever you have to use object (basically array), it means you are dealing with things that is time related.

That means you have to store the data for the future references.

You can't ignore the past. Your future is determined not by just what happens now, but also by what happen in the past.

It means the data or the rule of our physical world is the one that can be remember.

Or the past has its signature in the present, for us to deduce the past.

Once we can figure out the past, we can make it part of the rule of the future.

Unless that future is completely determined by now.

Or the rule of the physics is irreversible in nature, that we can't go back to see the past. I think the core is that, the physics quantum or classical, is both guarantee to be persisted in the timeline.

Physics is determining the computing world.

the reason you have to use object is:

the next value you want to compute has to be determined not only by current value provided, but also past or further information.

it's not only because of the nature of locality but also the nature of time.
