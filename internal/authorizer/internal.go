package authorizer

import (
	"github.com/Codename-Uranium/tunnel/pkg/auth"
	"github.com/Codename-Uranium/tunnel/pkg/xerror"
)

type JWTAuthorizer struct {
	checker *auth.JWTChecker
	running bool
}

func NewJWT(keyKeeper auth.KeyStore) (*JWTAuthorizer, error) {
	checker, err := auth.NewJWTChecker(keyKeeper)

	if err != nil {
		return nil, err
	}

	return &JWTAuthorizer{
		checker: checker,
		running: true,
	}, nil
}

func (d *JWTAuthorizer) Shutdown() error {
	d.running = false
	return nil
}

func (d *JWTAuthorizer) Running() bool {
	return d.running
}

func (d *JWTAuthorizer) Authenticate(tokenString string, myAudience string) (*auth.ClientClaims, error) {
	var claims auth.ClientClaims

	err := d.checker.Parse(tokenString, &claims)
	if err != nil {
		return nil, err
	}

	if !claims.Audience.Has(myAudience) {
		return nil, xerror.EAuthenticationFailed("invalid audience", nil)
	}

	return &claims, nil
}
