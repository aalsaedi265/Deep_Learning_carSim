
// linearly interpolates between two values(a and b) based on a third value(t).In your case, it calculates the angle of each ray within the spread of the sensor's field of view. a is the starting angle, b is the ending angle, and t determines the interpolation point between a and b.
function lerp(a, b, t) {
    return a+(b-a)*t
}