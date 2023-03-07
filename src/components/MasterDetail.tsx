import { createContext, useContext, Component } from 'react';

interface Payload {
  content: string;
}

interface ItemProps {
  payload: Payload;
}

interface Context {
  payload?: Payload;
  setActivePayload: Function;
}

const ItemContext = createContext<Context | null>(null);

const Item : React.FC<ItemProps> = ({ children, payload }) => {
  const context = useContext(ItemContext);
  
  return (
    <div onClick={() => context?.setActivePayload(payload)}>
      {children}
    </div>
  )
}

const Detail: React.FC = () => {
  const context = useContext(ItemContext);
  return (
    <div style={{ float: 'right' }}>{context?.payload?.content}</div>
  );
}

class MasterDetail extends Component {
  state = {};
  static Item = Item;
  static Detail = Detail;
  static contextType = ItemContext;

  setActivePayload = (payload: Payload) => this.setState({ payload });

  render() {
    const contextProps = {
      ...this.state,
      setActivePayload: this.setActivePayload
    }
    return (
      <ItemContext.Provider value={contextProps}>
        <div>{this.props.children}</div>
      </ItemContext.Provider>   
    );
  }
}

export default MasterDetail;