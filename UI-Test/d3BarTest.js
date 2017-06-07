describe('the svg ', function() {
    let svg = document.getElementsByTagName('svg');
    //  to test number of svgs
    it('svg should be created',function() {
        expect(svg.length).to.equal(3);
    });
    //  to test value of rectangular bar
    it('svg contains rectagle bars',function() {
        expect(document.getElementsByTagName("rect")).to.not.be.null;
    });
    function getSvg() {
        return d3.select('svg');
    }
    });