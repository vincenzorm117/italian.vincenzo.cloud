package set

import "errors"


type HashsetMap map[string]struct{}

type Set struct {
	set HashsetMap
}

func (h *Set) Add(value string) error {
	if _, ok := h.set[value]; ok {
		return errors.New("Cannot add duplicate values.")
	}

	h.set[value] = struct{}{}
	return nil
}

func (h *Set) Has(value string) bool {
	if _, ok := h.set[value]; ok {
		return true
	}
	return false
}

func NewSet(values ...string) *Set {
	hashset := Set{make(HashsetMap)}

	for _, value := range values {
		hashset.set[value] = struct{}{}
	}

	return &hashset
}