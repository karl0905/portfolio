client.once('ready', () => {
  console.log('ready');

  cron.schedule('*/2 * * * *', async () => {
    try {
      const { playerPuuid, matchData, matchId } = await getRecentMatch();
      const descriptions = getDescriptions()
      const mostRecentMatch = getMostRecentMatch();
      if (matchId === mostRecentMatch) {
        console.log('no new game. returning')
        return;
      } else {
        console.log('new game - discord message sent')
        writeMostRecentMatch({ mostRecentMatch: matchId })
        await buildNotificationEmbed(playerPuuid, matchData, client, descriptions, channelId);
      }
    } catch (error) {
      console.error('Error in scheduled task:', error)
    }
  })
})
