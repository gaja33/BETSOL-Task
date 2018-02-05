'use strict';


angular.module('angularApp')
    .controller('HomeCtrl', function ($scope, $http, DataSharing, $location, $timeout) {

        $scope.getRepos = function (username) {
            var arrayList = []
            $http.get('https://api.github.com/users/' + username + '/repos').then(function (resp) {
                console.log("resp", resp)
                $scope.repos = resp.data;

                angular.forEach($scope.repos, function (val, key) {
                    $http.get('https://api.github.com/repos/' + username + '/' + val.name + '/commits').then(function (resp) {
                        console.log(resp)
                        if (resp.status == 200) {
                            arrayList.push({
                                length1: resp.data.length,
                                repoName: val.name
                            })
                        }
                    }).catch(function (error) { // use catch instead of error
                        console.log(error)
                        if (error.status == 409) {
                            arrayList.push({
                                length1: 0,
                                repoName: val.name
                            })
                        }
                    })
                })
            })
            console.log(arrayList)

            $scope.generateChart = function (data) {
                console.log("dat", data)
                    // set the dimensions of the canvas
                var margin = {
                        top: 20,
                        right: 20,
                        bottom: 70,
                        left: 40
                    },
                    width = 600 - margin.left - margin.right,
                    height = 300 - margin.top - margin.bottom;


                // set the ranges
                var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

                var y = d3.scale.linear().range([height, 0]);

                // define the axis
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")


                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(10);


                // add the SVG element
                var svg = d3.select("#chart")
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 950 400")
                    .attr("class", "history").style("width", "100%").style("height", "auto")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");


                console.log("dat", data)
                data.forEach(function (d) {
                    d.repoName = d.repoName;
                    d.length1 = +d.length1;
                });

                // scale the range of the data
                x.domain(data.map(function (d) {
                    return d.repoName;
                }));
                y.domain([0, d3.max(data, function (d) {
                    return d.length1;
                })]);

                // add axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 5)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("No. of commits");


                // Add bar chart
                svg.selectAll("bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.repoName);
                    })
                    .attr("width", x.rangeBand())
                    .attr("y", function (d) {
                        return y(d.length1);
                    })
                    .attr("height", function (d) {
                        return height - y(d.length1);
                    });

            }

            $timeout(function () {
                $scope.generateChart(arrayList);
            }, 2000)

        }

        $scope.getCommits = function (owner, repoName) {
            DataSharing.setOwnerRepo(owner, repoName)
            $location.path('/listCommit');
        }

    });
