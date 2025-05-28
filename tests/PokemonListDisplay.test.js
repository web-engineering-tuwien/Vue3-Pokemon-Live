import { mount } from '@vue/test-utils'
import PokemonListDisplay from '../src/components/PokemonListDisplay.vue'

describe('PokemonListDisplay', () => {
    it('renders a list of Pokémon', () => {
        const wrapper = mount(PokemonListDisplay, {
            props: {
                pokemon: [
                    { name: 'bulbasaur', url: '/bulbasaur' },
                    { name: 'charmander', url: '/charmander' }
                ],
                selectedName: 'charmander'
            }
        })

        const items = wrapper.findAll('li')
        expect(items).toHaveLength(2)
        expect(items[1].classes()).toContain('selected')
    })

    it('emits "select" event on click', async () => {
        const wrapper = mount(PokemonListDisplay, {
            props: {
                pokemon: [{ name: 'pikachu', url: '/pikachu' }],
                selectedName: null
            }
        })

        await wrapper.find('li').trigger('click')
        expect(wrapper.emitted().select).toBeTruthy()
        expect(wrapper.emitted().select[0][0].name).toBe('pikachu')
    })
})