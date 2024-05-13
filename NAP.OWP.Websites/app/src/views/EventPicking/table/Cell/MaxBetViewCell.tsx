const MaxBetViewCell = ({
  maxBet,
  owpLeagueId
}: {
  maxBet: string | undefined;
  owpLeagueId: number;
}) => {
  const handleOnclick = () => {
    window.open(`LeagueManagement?leagueId=${owpLeagueId}`, `${owpLeagueId}`);
  };

  return (
    <div className='max-bet-cell'>
      {maxBet ? (
        <p className='max-bet-cell__value'>{maxBet}</p>
      ) : (
        <a className='mb__check' onClick={handleOnclick}>
          Check
        </a>
      )}
    </div>
  );
};

export default MaxBetViewCell;
