/**
 * Created by GunaySukru on 14.07.2017.
 */
const app = angular.module('movieSearchApp', [])
    .controller('movieSearchCtrl', function ($scope, $http) {
        $scope.isLoading = false;
        $scope.movieName = "shell";
        $scope.movies = [];
        $scope.searchedMovieDetail = [];
        $scope.fetchMovies = function () {
            $scope.isLoading = true;
            $http.get("https://api.themoviedb.org/3/search/movie?api_key=## YOUR API KEY ##=" + $scope.movieName).then(function (res) {
                $scope.movies = res.data.results;
                $http.get("https://api.themoviedb.org/3/movie/" + $scope.movies[0].id + "?api_key=## YOUR API KEY ##&language=en-US&append_to_response=casts%2Cvideos").then(function (res) {
                    $scope.searchedMovieDetail = res.data;
                    console.log($scope.searchedMovieDetail);
                }).catch(function (err) {
                    console.error(err);
                });
            }).catch(function (err) {
                console.error(err);
            });
        }
        $scope.fetchMovies();
        $scope.movieName = "";
    });