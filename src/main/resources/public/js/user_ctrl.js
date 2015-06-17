app.factory('cuenta', ['$http', function($http) {
    var o = {
        cuenta : {
            usuario: '',
            email: ''
        },
        jugadores: []
    };
    o.getCuenta = function(cuenta) {
        return $http.post('/cuenta/ingresar', cuenta).success(function(data) {
            console.log(data);
            if(data.msg == null) {
                angular.copy(data, o.cuenta);
                o.getJugadores(o.cuenta.usuario);
            }
        });
    }
    o.setCuenta = function(cuenta) {
        return $http.post('/cuenta/crear', cuenta).success(function(data) {
            console.log(data);
            angular.copy(data, o.cuenta);
        });
    }
    o.getJugadores = function(usuario) {
        return $http.get('/jugadores/'+usuario).success(function(data) {
            console.log(data);
            angular.copy(data, o.jugadores);
        });
    }

    return o;
}]);

app.controller('UserCtrl', ['$scope', 'cuenta', function($scope, cuenta) {
    $scope.cuenta = cuenta.cuenta;
    $scope.crearCuenta = function() {
        cuenta.setCuenta({usuario: $scope.cr_usuario, email: $scope.cr_email, contrasenia: $scope.cr_contrasenia});
    }
    $scope.ingresarCuenta = function() {
        cuenta.getCuenta({usuario: $scope.ing_usuario, contrasenia: $scope.ing_contrasenia});
    }
}]);